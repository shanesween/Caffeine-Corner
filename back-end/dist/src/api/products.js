"use strict";
// @ts-nocheck
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
const express_1 = __importDefault(require("express"));
const router = express_1.default();
const models_1 = require("../db/models");
// Get All Products
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield models_1.Product.findAll({
            order: [["id", "ASC"]],
        });
        res.json(products);
    }
    catch (err) {
        next(err);
    }
}));
// Get single Product based on ID
router.get("/:productId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield models_1.Product.findByPk(req.params.productId, {
            include: [{ model: models_1.Review }],
        });
        res.json(product);
    }
    catch (err) {
        next(err);
    }
}));
// Get Products based on Category
router.get("/category/:category", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield models_1.Product.findAll({
            where: { category: req.params.category },
            order: [["id", "ASC"]],
        });
        res.json(products);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
