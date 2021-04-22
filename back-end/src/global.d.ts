import { Category } from "./common";

interface IProduct {
    title: string
    description: string
    price: number
    stock: number
    imageUrl: string
    category: Category
    origin: string
}

interface IOrder {
    userId: number
    status: string
    total?: number
}

interface IOrderItem {
    quantity: number
    price: number
    orderId?: number
    productId: number
}

interface IReview {
    userId: number
    productId: number
    text: string
    rating: number
}

interface IUser {
    id?: number,
    email: string
    password: string
    isAdmin: boolean
    address: string
    salt?: string
    googleId?: string
}


declare module "express-session" {
    interface Session {
        cartId: number;
    }
}

declare global {
    namespace Express {
        interface Request {
            user: IUser
        }
    }
}
