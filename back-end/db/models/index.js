const db = require('../db')
const User = require('../models/user')
const Review = require('../models/review')
const Product = require('../models/product')
const Order = require('../models/order')
const OrderItem = require('../models/orderItem')

User.hasMany(Order)
User.hasMany(Review)

Product.belongsToMany(Order, {through: OrderItem})
Order.belongsToMany(Product, {through: OrderItem})

Review.belongsTo(Product)
Review.belongsTo(User)
Order.belongsTo(User)
Product.hasMany(Review)

module.exports = {
  db,
  User,
  Order,
  Product,
  OrderItem,
  Review
}
