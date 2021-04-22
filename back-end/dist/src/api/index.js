"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default();
const products_1 = __importDefault(require("./products"));
const orders_1 = __importDefault(require("./orders"));
const cart_1 = __importDefault(require("./cart"));
const auth_1 = __importDefault(require("./auth"));
router.use("/products", products_1.default);
router.use("/orders", orders_1.default);
router.use("/cart", cart_1.default);
router.use("/auth", auth_1.default);
router.use((req, res, next) => {
    const err = new Error("Not found.");
    next(err);
});
module.exports = router;
