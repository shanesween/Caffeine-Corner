const router = require("express").Router()
const { Product, Review } = require("../db/models")
module.exports = router

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

// Get Products based on Filter
router.get("/filter/:filter", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { category: req.params.filter },
      order: [["id", "ASC"]],
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

