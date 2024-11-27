'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.belongsTo(models.Event, { foreignKey: 'event_id', as: 'event' });
      Ticket.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Ticket.hasMany(models.OrderItem, { foreignKey: 'ticket_id', as: 'orderItems' });
    }
  }
  Ticket.init({
    booking_date: { //data de inscrição
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    ticket_type: {
      type: DataTypes.ENUM('meia', 'inteira'),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('confirmado', 'pendente', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendente'
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    available_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};