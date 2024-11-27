'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Order.hasMany(models.OrderItem, { foreignKey: 'order_id', as: 'orderItems' });
    }
  }
  Order.init({
    status: {
      type: DataTypes.ENUM('pendente', 'pago', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendente'
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00 // Valor padrão de 0, pode ser ajustado conforme necessário
    },
    qr_code_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Order',
    timestamps: true
  });
  return Order;
};