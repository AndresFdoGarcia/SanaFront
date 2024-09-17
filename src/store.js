import { configureStore } from '@reduxjs/toolkit'
import counterReducer  from './Features/Counter/counterSlice'
import productsReducer from './Features/Products/productsSlice';
import productDetailReducer from './Features/ProductDetail/productDetailSlice';
import cartReducer from './Features/Cart/cartSlice';
import userSlice from './Features/User/userSlice';
import orderSlice from './Features/Orders/orderSlice';

const preloadedState = {
  cart: {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
  },
};

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    user: userSlice,
    orders: orderSlice,
  },
  preloadedState,
})