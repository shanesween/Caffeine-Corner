const router = require("express").Router()
const { Product } = require("../db/models")
module.exports = router

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

