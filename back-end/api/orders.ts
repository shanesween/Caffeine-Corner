const { Order, User, Product } = require("../db/models")

const router = require("express").Router()
module.exports = router

// Get All Orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      order: [["updatedAt", "ASC"]],
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// Get Single Order based on Id
router.get("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [{ model: User }, { model: Product }],
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})
