// @ts-nocheck

import { ICategory } from '../common';
import { IProduct, IUser, IOrder, IOrderItem, IReview } from '../global';
import db from './db'
import { Product, Order, OrderItem, Review } from './models';
// import {
//     User,
//     Product,
//     Order,
//     OrderItem,
//     Review,
// } from "./models"

const faker = require("faker")

// Create Products
// const randomProductCategory: Category = () => {
//  Category[Math.floor(Math.random() * 5)]
// }

const randomEnumValue = (enumeration: ICategory) => {
    const values = Object.keys(enumeration);
    const enumKey: string = values[Math.floor(Math.random() * values.length)];
    return enumeration[enumKey];
}

let productCount = 200
// const products: Product[] = []
const products: IProduct[] = []
while (productCount) {
    products.push({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.random.number(),
        imageUrl: faker.image.nature(),
        category: randomEnumValue(ICategory),
        origin: faker.address.country(),
    })
    --productCount
}

// Create Users
let userCount = 99
const users: IUser[] = []
while (userCount) {
    users.push({
        email: faker.internet.email(),
        password: faker.internet.password(),
        isAdmin: false,
        address:
            `${faker.address.streetAddress()}, ${faker.address.streetName()}, 
        ${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.zipCode()}
        `,
    })
    userCount--
}

// Create Orders
// random num items that ramdomly choose existing user id
const orderStatus = ["pending", "completed"]
const randomOrderStatus = () => orderStatus[Math.floor(Math.random() * 2)]
let orderCount = 20
const orders: IOrder[] = []
while (orderCount) {
    orders.push({
        userId: Math.floor(Math.random() * users.length + 1),
        status: randomOrderStatus(),
    })
    --orderCount
}

// create orderItems and populate orders (total # of orders)
const orderItems: IOrderItem[] = []
let singleOrderItems: IOrderItem[] = []
let populateOrders = orders.length
while (populateOrders) {
    // set amount of items on current order
    let orderItemCount = Math.floor(Math.random() * 20) + 1

    // push orderItem into the singleOrderItems []
    while (orderItemCount) {
        console.log(orderItems.length)
        singleOrderItems.push({
            productId: orderItems.length + 1,
            quantity: Math.ceil(Math.random() * 9),
            price: faker.commerce.price(),
        })

        --orderItemCount
    }

    let orderIdCounter = 1
    singleOrderItems.forEach((orderItem) => {
        orderItem.orderId = orderIdCounter
        orderItems.push(orderItem)
        ++orderIdCounter
    })

    singleOrderItems = []
    --populateOrders
}

// Create Reviews
let reviewCount = 100
const reviews: IReview[] = []
while (reviewCount) {
    reviews.push({
        text: faker.lorem.paragraph(),
        rating: Math.floor(Math.random() * 5) + 1,
        userId: Math.floor(Math.random() * users.length + 1),
        productId: Math.floor(Math.random() * products.length + 1),
    })
    --reviewCount
}

// seed the DB
const seed = async () => {
    await db.sync({ force: true })
    console.log("db forced to sync")

    // seed users
    await Promise.all(users.map((user) => User.create(user)))
    console.log(`seeded ${users.length} users`)

    // seed products
    await Promise.all(products.map((product) => Product.create(product)))
    console.log(`seeded ${products.length} products`)

    // seed orders
    await Promise.all(orders.map((order) => Order.create(order)))
    console.log(`seeded ${orders.length} orders`)

    // seed orderItems
    await Promise.all(orderItems.map((orderItem) => OrderItem.create(orderItem)))
    console.log(`seeded ${orderItems.length} orderItems`)

    // seed reviews
    await Promise.all(reviews.map((review) => Review.create(review)))
    console.log(`seeded ${reviews.length} reviews`)

    console.log("seeded successfully")
}


const runSeed = async () => {
    console.log("seeding...")
    try {
        await seed()
    } catch (error) {
        console.error(error)
        process.exitCode = 1
    } finally {
        console.log("closing db connection")
        await db.close()
        console.log("db connection closed")
    }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
    runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
