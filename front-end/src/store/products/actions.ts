import axios from "axios"
import { Dispatch } from 'react'
import { GET_PRODUCTS } from './constants'
import { Product, ProductsActionTypes } from './types'


export const getProductsAction = (products: Product[]): ProductsActionTypes => ({
    type: GET_PRODUCTS,
    payload: products
})

export const getProducts = () => async (dispatch: Dispatch<ProductsActionTypes>) => {
    try {
        const { data } = await axios.get("http://localhost:8080/api/products")
        console.log(data)
        dispatch(getProductsAction(data))
    } catch (err) {
        console.error(err)
    }
}

