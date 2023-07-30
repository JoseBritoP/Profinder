const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("Review", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        max: 5,
        min: 1
      }
    }
  }, {
    timestamps: false,
  });
};// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8