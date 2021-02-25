import axios from "axios"
import { Dispatch } from 'react'
import { GET_PRODUCTS } from './constants'
import { Product, ProductsActionTypes } from './types'

// Get All Products 
export const getProductsAction = (
    products: Product[]): ProductsActionTypes => ({
        type: GET_PRODUCTS,
        payload: products
    })

export const getProducts = (filter?: string) => async (
    dispatch: Dispatch<ProductsActionTypes>
) => {
    try {
        let data
        if (filter) {
            data = await axios.get(`http://localhost:8080/api/products/category/${filter}`)
        } else {
            data = await axios.get("http://localhost:8080/api/products")
        }
        dispatch(getProductsAction(data.data))
    } catch (err) {
        console.error(err)
    }
}

