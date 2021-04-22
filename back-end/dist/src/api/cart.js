"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const express_1 = __importDefault(require("express"));
const { Order, Product, OrderItem } = require("../db/models");
const router = express_1.default();
const setCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userCart;
    let session = req.session;
    if (!req.user) {
        if (!session.cartId) {
            userCart = yield Order.create();
            session.cartId = userCart.id;
            yield session.save();
        }
        else {
            userCart = yield Order.findOne({
                where: { status: "pending", id: session.cartId },
                include: { model: Product, order: [["id", "ASC"]] },
            });
        }
    }
    else {
        userCart = yield Order.findOne({
            where: { userId: req.user.id, status: 'pending' },
            include: { model: Product, order: [['id', 'ASC']] },
        });
        if (!userCart) {
            userCart = yield Order.create({
                userId: req.user.id,
            });
        }
        if (session.cartId) {
            let items = yield OrderItem.findAll({
                where: { orderId: session.cartId },
            });
            let newItems = items.map((item) => {
                return {
                    orderId: userCart.id,
                    productId: item.dataValues.productId,
                    quantity: item.dataValues.quantity,
                };
            });
            yield OrderItem.bulkCreate(newItems);
        }
        userCart = yield Order.findOne({
            where: { userId: req.user.id, status: 'pending' },
            include: { model: Product, order: [['id', 'ASC']] },
        });
        session.cartId = 0;
        yield req.session.save();
    }
    console.log("CART!!!", userCart);
    return userCart;
});
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield setCart(req, res);
    }
    catch (err) {
        next(err);
    }
}));
router.put('/addItem', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cart = yield setCart(req, res);
        console.log("CART HERE", cart);
        const product = yield Product.findByPk(req.body.productId);
        const orderItem = yield OrderItem.findOne({
            where: { productId: product.id, orderId: cart.id },
        });
        if (orderItem) {
            req.body.quantity
                ? (orderItem.quantity = req.body.quantity)
                : orderItem.quantity++;
            yield orderItem.save();
        }
        else {
            yield OrderItem.create({
                productId: product.id,
                orderId: cart.id,
                quantity: req.body.quantity ? req.body.quantity : 1,
            });
        }
        let updatedCart = yield Order.findByPk(cart.id, {
            include: {
                model: Product,
                order: [['id', 'ASC']],
            },
        });
        res.json(updatedCart);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
