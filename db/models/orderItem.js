const Sequelize = require('sequelize')
const db = require('../db')
const product = require('./product')

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0
  }
})

module.exports = OrderItem
