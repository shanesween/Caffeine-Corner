import { combineReducers } from 'redux';
import { getProductsReducer, getSingleProductReducer } from '../products/reducer';
import { userReducer } from '../user/reducer';

const rootReducer = combineReducers({
    products: getProductsReducer,
    product: getSingleProductReducer,
    user: userReducer
});


export default rootReducer;