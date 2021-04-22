import * as Sequelize from "sequelize"
import db from "../db"

const OrderItem = db.define("orderItem", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0,
  },
})

export default OrderItem
