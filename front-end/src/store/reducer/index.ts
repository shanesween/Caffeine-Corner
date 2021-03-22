import { combineReducers } from 'redux';
import { cartReducer } from '../cart/reducer';
import { getProductsReducer, getSingleProductReducer } from '../products/reducer';
import { userReducer } from '../user/reducer';

const rootReducer = combineReducers({
    products: getProductsReducer,
    product: getSingleProductReducer,
    user: userReducer,
    cart: cartReducer
});


export default rootReducer;