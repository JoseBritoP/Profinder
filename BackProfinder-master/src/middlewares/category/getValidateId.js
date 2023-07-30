module.exports = async (req,res,next) => {
  const { id } = req.params;

  if(!id){
    return res.status(404).json({error: `El id es obligatorio!`});
  };

  if(!Number(id)){
    return res.status(404).json({error: `El id de las categorías es númerico`});
  };

  next();
};