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
const common_1 = require("../common");
const db_1 = __importDefault(require("./db"));
const models_1 = require("./models");
// import {
//     User,
//     Product,
//     Order,
//     OrderItem,
//     Review,
// } from "./models"
const faker = require("faker");
// Create Products
// const randomProductCategory: Category = () => {
//  Category[Math.floor(Math.random() * 5)]
// }
const randomEnumValue = (enumeration) => {
    const values = Object.keys(enumeration);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return enumeration[enumKey];
};
let productCount = 200;
// const products: Product[] = []
const products = [];
while (productCount) {
    products.push({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.random.number(),
        imageUrl: faker.image.nature(),
        category: randomEnumValue(common_1.ICategory),
        origin: faker.address.country(),
    });
    --productCount;
}
// Create Users
let userCount = 99;
const users = [];
while (userCount) {
    users.push({
        email: faker.internet.email(),
        password: faker.internet.password(),
        isAdmin: false,
        address: `${faker.address.streetAddress()}, ${faker.address.streetName()}, 
        ${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.zipCode()}
        `,
    });
    userCount--;
}
// Create Orders
// random num items that ramdomly choose existing user id
const orderStatus = ["pending", "completed"];
const randomOrderStatus = () => orderStatus[Math.floor(Math.random() * 2)];
let orderCount = 20;
const orders = [];
while (orderCount) {
    orders.push({
        userId: Math.floor(Math.random() * users.length + 1),
        status: randomOrderStatus(),
    });
    --orderCount;
}
// create orderItems and populate orders (total # of orders)
const orderItems = [];
let singleOrderItems = [];
let populateOrders = orders.length;
while (populateOrders) {
    // set amount of items on current order
    let orderItemCount = Math.floor(Math.random() * 20) + 1;
    // push orderItem into the singleOrderItems []
    while (orderItemCount) {
        console.log(orderItems.length);
        singleOrderItems.push({
            productId: orderItems.length + 1,
            quantity: Math.ceil(Math.random() * 9),
            price: faker.commerce.price(),
        });
        --orderItemCount;
    }
    let orderIdCounter = 1;
    singleOrderItems.forEach((orderItem) => {
        orderItem.orderId = orderIdCounter;
        orderItems.push(orderItem);
        ++orderIdCounter;
    });
    singleOrderItems = [];
    --populateOrders;
}
// Create Reviews
let reviewCount = 100;
const reviews = [];
while (reviewCount) {
    reviews.push({
        text: faker.lorem.paragraph(),
        rating: Math.floor(Math.random() * 5) + 1,
        userId: Math.floor(Math.random() * users.length + 1),
        productId: Math.floor(Math.random() * products.length + 1),
    });
    --reviewCount;
}
// seed the DB
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.sync({ force: true });
    console.log("db forced to sync");
    // seed users
    yield Promise.all(users.map((user) => User.create(user)));
    console.log(`seeded ${users.length} users`);
    // seed products
    yield Promise.all(products.map((product) => models_1.Product.create(product)));
    console.log(`seeded ${products.length} products`);
    // seed orders
    yield Promise.all(orders.map((order) => models_1.Order.create(order)));
    console.log(`seeded ${orders.length} orders`);
    // seed orderItems
    yield Promise.all(orderItems.map((orderItem) => models_1.OrderItem.create(orderItem)));
    console.log(`seeded ${orderItems.length} orderItems`);
    // seed reviews
    yield Promise.all(reviews.map((review) => models_1.Review.create(review)));
    console.log(`seeded ${reviews.length} reviews`);
    console.log("seeded successfully");
});
const runSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("seeding...");
    try {
        yield seed();
    }
    catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
    finally {
        console.log("closing db connection");
        yield db_1.default.close();
        console.log("db connection closed");
    }
});
// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
    runSeed();
}
// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
