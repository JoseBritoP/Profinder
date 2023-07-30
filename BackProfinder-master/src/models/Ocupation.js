const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Ocupation",
  {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate:{
        // is: /^[a-zA-Z\s]+$/, // Nombre debe ser una palabra o frase sin números ni símbolos
        // len: [3,15]  //El nombre de la category debe tener mínimo 3 caracteres y máximo 20
      // }
    }
  },{
    timestamps: false,
  });
};// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8