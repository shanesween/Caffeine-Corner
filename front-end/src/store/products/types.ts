import { GET_PRODUCTS } from './constants'

export interface Product {
    id: number
    title: string
    description: string
    price: number
    stock: number
    imageUrl: string
    category: CategoryEnum
    origin: string
}

type CategoryEnum = "coffee" | "tea" | "energy drink" | "capsule" | "edible"

export interface GetProductsStateType {
    products: Product[]
}

interface GetProductsActionType {
    type: typeof GET_PRODUCTS
    payload: Product[]
}

export type ProductsActionTypes = GetProductsActionType
