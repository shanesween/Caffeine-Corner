import axios from 'axios'
import { Dispatch } from 'react'
import { SET_CART } from './constants'
import { Cart, CartActionTypes } from './types'

const setCart = (cart: Cart): CartActionTypes => ({
    type: SET_CART,
    payload: cart
})

export const fetchCart = () => async (dispatch: Dispatch<CartActionTypes>) => {
    try {
        const { data } = await axios.get(`http://localhost:8080/api/cart`)
        console.log(data)
        dispatch(setCart(data))
    } catch (err) {
        console.error(err)

    }
}

export const addProduct = (productId: number, quantity: number) => async (dispatch: Dispatch<CartActionTypes>) => {
    try {
        const { data } = await axios.put(`/api/cart/addItem`, {
            productId,
            quantity
        });
        dispatch(setCart(data));
    } catch (err) {
        console.error("Error in addProduct thunk", err);
    }
}