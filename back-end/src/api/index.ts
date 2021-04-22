import Router from "express"
const router = Router()
import Products from './products'
import Orders from './orders'
import Cart from './cart'
import Auth from './auth'

router.use("/products", Products)
router.use("/orders", Orders)
router.use("/cart", Cart)
router.use("/auth", Auth)

router.use((req, res, next) => {
  const err = new Error("Not found.")
  next(err)
})

module.exports = router
