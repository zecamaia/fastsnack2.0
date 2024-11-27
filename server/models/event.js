'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Event.hasMany(models.Category, { foreignKey: 'event_id', as: 'category' })
      Event.belongsTo(models.EventCategory, { foreignKey: 'event_category_id', as: 'eventCategory' });
      Event.hasMany(models.Ticket, { foreignKey: 'event_id', as: 'ticket' })
    }
  }
  Event.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('ativo', 'inativo'),
      allowNull: false,
      defaultValue: 'ativo'
    },
  }, {
    sequelize,
    modelName: 'Event',
    timestamps: true,
  });
  return Event;
};