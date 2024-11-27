'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsTo(models.Event, { foreignKey: 'event_id', as: 'evento' })
      Category.hasMany(models.Product, { foreignKey: 'category_id', as: 'produto' });
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};