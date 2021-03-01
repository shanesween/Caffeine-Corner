const router = require("express").Router()
const { Order, Product, OrderItem } = require("../db/models")

module.exports = router

router.get("/", async (req, res, next) => {
  try {
    let userCart
    if (!req.user) {
      if (!req.session.cartId) {
        userCart = await Order.create()
        req.session.cartId = userCart.id
        await req.session.save()
      } else {
        userCart = await Order.findOne({
          where: { status: "pending", id: req.session.cartId },
          include: { model: Product, order: [["id", "ASC"]] },
        })
      }
    } else {
      userCart = await Order.findOne({
        where: { userId: req.user.id, status: 'pending' },
        include: { model: Product, order: [['id', 'ASC']] },
      })
      if (!userCart) {
        userCart = await Order.create({
          userId: req.user.id,
        });
      }
      if (req.session.cartId) {
        let items = await OrderItem.findAll({
          where: { orderId: req.session.cartId },
        });
        let newItems = items.map(item => {
          return {
            orderId: userCart.id,
            productId: item.dataValues.productId,
            quantity: item.dataValues.quantity,
          };
        });
        await OrderItem.bulkCreate(newItems);
      }
      userCart = await Order.findOne({
        where: { userId: req.user.id, status: 'pending' },
        include: { model: Product, order: [['id', 'ASC']] },
      })
      req.session.cartId = null;
      await req.session.save();
    }
    res.json(userCart);
  } catch (err) {
    next(err)
  }
})
