"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const db_1 = __importDefault(require("../db"));
const user_1 = __importDefault(require("./user"));
const review_1 = __importDefault(require("./review"));
const product_1 = __importDefault(require("./product"));
const order_1 = __importDefault(require("./order"));
const orderItem_1 = __importDefault(require("./orderItem"));
user_1.default.hasMany(order_1.default);
user_1.default.hasMany(review_1.default);
product_1.default.belongsToMany(order_1.default, { through: orderItem_1.default });
order_1.default.belongsToMany(product_1.default, { through: orderItem_1.default });
review_1.default.belongsTo(product_1.default);
review_1.default.belongsTo(user_1.default);
order_1.default.belongsTo(user_1.default);
product_1.default.hasMany(review_1.default);
module.exports = {
    db: db_1.default,
    User: user_1.default,
    Order: order_1.default,
    Product: product_1.default,
    OrderItem: orderItem_1.default,
    Review: review_1.default,
};
