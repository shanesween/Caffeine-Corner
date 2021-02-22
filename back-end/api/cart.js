const router = require("express").Router()
const { Order } = require("../db/models")

module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const userCart
    if (!req.user) {
      if (!req.session.cardId) {
        userCart = await Order.create()
        req.session.cartId = userCart.cardId
        await req.session.save()
      } else {
        userCart = await Order.findOne({
          where: { status: "pending", id: req.session.cartId },
          include: { model: Product, order: [["id", "ASC"]] },
        })
      }
    }
  } catch (err) {
    next(err)
  }
})
