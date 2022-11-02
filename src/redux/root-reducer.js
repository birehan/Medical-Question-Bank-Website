import { combineReducers } from 'redux';
import  userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import orderReducer from './order/order.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';
import toastReducer from './toast/toast.reducer';
import courseReducer from './course/course.reducer'

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    toast: toastReducer,
    course: courseReducer

});

export default persistReducer(persistConfig, rootReducer);