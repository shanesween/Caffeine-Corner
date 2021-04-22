import * as Sequelize from "sequelize"
import db from "../db"

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

export default Order
