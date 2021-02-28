import { combineReducers } from 'redux';
import { getProductsReducer, getSingleProductReducer } from '../products/reducer';

const rootReducer = combineReducers({
    products: getProductsReducer,
    product: getSingleProductReducer
});

export default rootReducer;