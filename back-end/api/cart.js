const router = require("express").Router()
const { Order, Product, OrderItem } = require("../db/models")

module.exports = router

const setCart = async (req, res) => {
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
  console.log("CART!!!", userCart)
  return userCart
}

router.get("/", async (req, res, next) => {
  try {
    await setCart(req, res)
  } catch (err) {
    next(err)
  }
})

router.put('/addItem', async (req, res, next) => {
  try {
    let cart = await setCart(req, res)
    console.log("CART HERE", cart)
    const product = await Product.findByPk(req.body.productId);
    const orderItem = await OrderItem.findOne({
      where: { productId: product.id, orderId: cart.id },
    });
    if (orderItem) {
      req.body.quantity
        ? (orderItem.quantity = req.body.quantity)
        : orderItem.quantity++;
      await orderItem.save();
    } else {
      await OrderItem.create({
        productId: product.id,
        orderId: cart.id,
        quantity: req.body.quantity ? req.body.quantity : 1,
      });
    }
    let updatedCart = await Order.findByPk(cart.id, {
      include: {
        model: Product,
        order: [['id', 'ASC']],
      },
    });
    res.json(updatedCart);
  } catch (err) {
    next(err);
  }
});

