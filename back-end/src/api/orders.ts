// @ts-nocheck

import { Order, User, Product } from '../db/models'
import Router from 'express'
const router = Router()

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

export default router