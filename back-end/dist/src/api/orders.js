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
const models_1 = require("../db/models");
const express_1 = __importDefault(require("express"));
const router = express_1.default();
// Get All Orders
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield models_1.Order.findAll({
            order: [["updatedAt", "ASC"]],
        });
        res.json(orders);
    }
    catch (err) {
        next(err);
    }
}));
// Get Single Order based on Id
router.get("/:orderId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield models_1.Order.findByPk(req.params.orderId, {
            include: [{ model: models_1.User }, { model: models_1.Product }],
        });
        res.json(order);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
