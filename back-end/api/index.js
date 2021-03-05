const router = require("express").Router()

router.use("/products", require("./products"))
router.use("/orders", require("./orders"))
router.use("/cart", require("./cart"))
router.use("/auth", require("./auth"))

router.use((req, res, next) => {
  const err = new Error("Not found.")
  err.status = 404
  next(err)
})

module.exports = router
