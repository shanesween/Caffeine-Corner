import { GET_PRODUCTS } from './constants'
import { GetProductsStateType, ProductsActionTypes } from './types'

const initialStateGetProducts: GetProductsStateType = {
    products: []
}

export const getProductsReducer = (
    state = initialStateGetProducts,
    action: ProductsActionTypes
): GetProductsStateType => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        default: return state
    }
}