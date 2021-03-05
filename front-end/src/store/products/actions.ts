import axios from "axios"
import { Dispatch } from 'react'
import { GET_PRODUCTS, GET_SINGLEPRODUCT } from './constants'
import { Product, ProductsActionTypes } from './types'

// Get All Products 
export const getProductsAction = (products: Product[]): ProductsActionTypes => (
    {
        type: GET_PRODUCTS,
        payload: products
    }
)

export const getProducts = (filter?: string) => async (
    dispatch: Dispatch<ProductsActionTypes>
) => {
    try {
        let res
        if (filter) {
            res = await axios.get(`http://localhost:8080/api/products/category/${filter}`)
        } else {
            res = await axios.get("http://localhost:8080/api/products")
        }
        dispatch(getProductsAction(res.data))
    } catch (err) {
        console.error(err)
    }
}

// Get Single Product by ID
export const getSingleProductAction = (
    product: Product): ProductsActionTypes => ({
        type: GET_SINGLEPRODUCT,
        payload: product
    })

export const getSingleProduct = (id: number) => async (
    dispatch: Dispatch<ProductsActionTypes>
) => {
    try {
        const data = await axios.get(`http://localhost:8080/api/products/${id}`)
        dispatch(getSingleProductAction(data.data))
    } catch (err) {
        console.error(err)
    }
}
