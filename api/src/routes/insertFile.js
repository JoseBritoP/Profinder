const { Router } = require('express');

const multer= require ('multer')

const { sequelize } = require("../db");





const insertFile= Router();



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb, id ) {
      console.log(file)
      cb(null, `${Date.now()}-${file.originalname}` )
    }
  })


const upload = multer({ storage: storage })


const uploadFile = async(req,res, file)=>{
  const {id}=req.body;
  const {name}= req.body;
  const document=req.file.originalname;

  try {
     const newDoc = await sequelize.query(`INSERT INTO "DocumentsProfesionals" (name,document) VALUES ('${name}','${document}') returning id`);
     
     const idDoc=newDoc[0][0].id

     const profesional= await sequelize.query(`UPDATE "DocumentsProfesionals" set "ProfesionalId"='${id}' where id= '${idDoc}'`);console.log(file)

     const profesionalDoc= await sequelize.query(`UPDATE "DocumentsProfesionals" set "document"='${document}' where id= '${idDoc}'`);
     
     const profesionalFile= await sequelize.query(`SELECT * FROM  "DocumentsProfesionals" where id= '${idDoc}'`);

     res.status(200).json({message:'Su documento ha sido guardado correctamemte'})


  } catch (error) {
    res.status(400).json({ error: error.message })

  }
};




insertFile.post('/insert', upload.single('myFile'), uploadFile);



module.exports=insertFile;
