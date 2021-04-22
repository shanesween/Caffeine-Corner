// @ts-nocheck

import Router from "express"
const router = Router()
import { Product, Review } from "../db/models"

// Get All Products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [["id", "ASC"]],
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// Get single Product based on ID
router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: [{ model: Review }],
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// Get Products based on Category
router.get("/category/:category", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { category: req.params.category },
      order: [["id", "ASC"]],
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

export default router