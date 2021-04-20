const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('pending', 'completed'),
    defaultValue: 'pending'
  },
  total: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0
  }
})

module.exports = Order
