const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("Country",
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
      validate:{
        is: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/,// Nombre debe ser una sola palabra sin números ni símbolos
        len:[3,20] //El nombre de la category debe tener mínimo 3 caracteres y máximo 20
      },
    }
  },{
    timestamps:false,
  })
};