const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Client", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 40] // Nombre entre 5 y 40 caracteres
      }
    },
    password: {
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null, //agregar máximo de 5
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      // validate: {
      //   is: /^[a-zA-Z\s]+$/, // Nombre debe ser una palabra o frase sin números ni símbolos
      //   len: [5, 120]
      // }
    },
    // ubication: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   validate: {
    //     len: [5, 50], // Ubicación entre 5 a 50 caracteres
    //     is: /^[\w\s.-]+$/ // Expresión regular para validar el formato de la ubicación
    //   }
    // },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    pro: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    softDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    }
  }, {
    timestamps: false,
  });
};
// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8
