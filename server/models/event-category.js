'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventCategory extends Model {
    static associate(models) {
      EventCategory.hasMany(models.Event, { foreignKey: 'event_category_id', as: 'categoriaEvento' });
    }
  }
  EventCategory.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  }, {
    sequelize,
    modelName: 'EventCategory',
    tableName: 'event_categories'
  });
  return EventCategory;
};