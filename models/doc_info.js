'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doc_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  doc_info.init({
    title: DataTypes.STRING,
    writerID: DataTypes.INTEGER,
    image: DataTypes.INTEGER,
	desc: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'doc_info',
  });
  return doc_info;
};