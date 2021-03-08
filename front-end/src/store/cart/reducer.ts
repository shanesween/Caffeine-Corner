import { SET_CART } from './constants';
import { Cart, CartActionTypes } from './types';

const initialStateSetCart: Cart = {
    orderItem: 0,
    quantity: 0,
    productId: 0
}

export const cartReducer = (state = initialStateSetCart, action: CartActionTypes): Cart => {
    switch (action.type) {
        case SET_CART:
            return action.payload
        default:
            return state
    }
}