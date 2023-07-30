
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("DocumentsProfesional",
  {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name:{
      type: DataTypes.STRING
    },
    document:{
        type: DataTypes.STRING
  }
},
{
    timestamps: false,
  });
}
