import { combineReducers } from 'redux';
import { getProductsReducer } from '../products/reducer';

const rootReducer = combineReducers({
    products: getProductsReducer
});

export default rootReducer;