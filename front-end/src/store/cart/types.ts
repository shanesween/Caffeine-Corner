import { SET_CART } from './constants';

export interface Cart {
    orderItem: number
    productId: number
    quantity: number
}

interface SetCartActionType {
    type: typeof SET_CART
    payload: Cart
}

export type CartActionTypes = SetCartActionType