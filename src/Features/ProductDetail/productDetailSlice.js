import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    product: null,
};

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        openProductDetail: (state, action) => {
            state.isOpen = true;
            state.product = action.payload;
        },
        closeProductDetail: (state) => {
            state.isOpen = false;
            state.product = null;
        },
    },
});

export const { openProductDetail, closeProductDetail } = productDetailSlice.actions;

export default productDetailSlice.reducer;