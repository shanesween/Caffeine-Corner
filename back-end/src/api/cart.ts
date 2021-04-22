// @ts-nocheck
import Router, { Request, Response } from "express"
import { Session } from "express-session"
import { IOrder, IOrderItem } from "../global"
const { Order, Product, OrderItem } = require("../db/models")

declare module 'express-session' {
  export interface Session {
    cartId: number
  }
}
const router = Router()


const setCart = async (req: Request, res: Response) => {
  let userCart: any
  let session: Session = req.session

  if (!req.user) {
    if (!session.cartId) {
      userCart = await Order.create()
      session.cartId = userCart.id
      await session.save()
    } else {
      userCart = await Order.findOne({
        where: { status: "pending", id: session.cartId },
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
    if (session.cartId) {
      let items = await OrderItem.findAll({
        where: { orderId: session.cartId },
      });
      let newItems = items.map((item) => {
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
    session.cartId = 0;
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

export default router