const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("Profesional",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          len:[5,40] // Nombre entre 5 y 40 caracteres
        }
      },
      password:{
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false, //Agregar phone
        validate: {
          isEmail: {
            msg: 'El email no tiene un formato válido',
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
       
      },
      image: {
        type: DataTypes.TEXT, //Podría ser un BLOB
        allowNull: true,
        validate: {
          isUrl: {
            msg: 'La URL de la imagen no es válida',
            args: true,
          },
        },
      },
      genre: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      rating: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      years_exp: {
        type: DataTypes.STRING, // Podría ser INTEGER pero string en caso que no tenga experiencia?
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
            
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      pro: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      softDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      }
    }, {
    timestamps: false,
  });
};// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8