import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem(`user`));
const custId = user ? user.custid : null;

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const baseUrl = `https://localhost:7026/api/Orders/GetOrders?custId=${custId}`;
    const response = await fetch(baseUrl);
  return response.json();
});

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default orderSlice.reducer;