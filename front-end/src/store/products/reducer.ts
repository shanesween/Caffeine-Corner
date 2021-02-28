import { GET_PRODUCTS, GET_SINGLEPRODUCT } from './constants'
import { GetProductsStateType, GetSingleProductStateType, Product, ProductsActionTypes } from './types'

const initialStateGetProducts: GetProductsStateType = {
    products: []
}

const initialStateGetSingleProduct: GetSingleProductStateType = {
    product: {
        id: 0,
        title: '',
        description: '',
        price: 0,
        stock: 0,
        imageUrl: '',
        category: 'coffee',
        origin: '',
    }
}

export const getProductsReducer = (
    state = initialStateGetProducts,
    action: ProductsActionTypes
): GetProductsStateType => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                products: action.payload
            }
        default: return state
    }
}

export const getSingleProductReducer = (
    state = initialStateGetSingleProduct,
    action: ProductsActionTypes
): GetSingleProductStateType => {
    switch (action.type) {
        case GET_SINGLEPRODUCT:
            return {
                product: action.payload
            }
        default: return state
    }
}