import db from "../db"
import User from "./user"
import Review from "./review"
import Product from "./product"
import Order from "./order"
import OrderItem from "./orderItem"

User.hasMany(Order)
User.hasMany(Review)

Product.belongsToMany(Order, { through: OrderItem })
Order.belongsToMany(Product, { through: OrderItem })

Review.belongsTo(Product)
Review.belongsTo(User)
Order.belongsTo(User)
Product.hasMany(Review)

export = {
  db,
  User,
  Order,
  Product,
  OrderItem,
  Review,
}