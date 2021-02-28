import { GET_PRODUCTS, GET_SINGLEPRODUCT } from './constants'

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

// Get All Products
export interface GetProductsStateType {
    products: Product[]
}

interface GetProductsActionType {
    type: typeof GET_PRODUCTS
    payload: Product[]
}

// Get Single Product
export interface GetSingleProductStateType {
    product: Product
}

interface GetSingleProductActionType {
    type: typeof GET_SINGLEPRODUCT
    payload: Product
}

export type ProductsActionTypes = GetProductsActionType | GetSingleProductActionType
