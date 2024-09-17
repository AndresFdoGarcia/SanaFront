import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImpvaG5kb2UiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJqb2huZG9lQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6Ikpob24iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiRG9lIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiVXNlciIsImV4cCI6MTcyOTE2MjMwNSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDIwMCIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQyMDAifQ.sXOWrjkJDf0jkYdO2xCjb-JLMvXc_Gv7yHt-B8AZKhM"
export const createOrder = createAsyncThunk(
    'cart/createOrder',
    async (order, { rejectWithValue }) => {
        try {
            const response = await fetch('https://localhost:7026/api/Orders/CreateOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(order),
            });

            if (!response.ok) {
                throw new Error('Error al crear la orden');
            }

            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingProduct = state.items.find(item => item.productId === product.productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(item => item.productId !== productId);
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const existingProduct = state.items.find(item => item.productId === productId);
            if (existingProduct) {
                existingProduct.quantity = quantity;
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cartItems');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.status = 'succeeded';
                state.items = [];
                localStorage.removeItem('cartItems');
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectTotalQuantity = (state) => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartStatus = (state) => state.cart.status;
export const selectCartError = (state) => state.cart.error;

export default cartSlice.reducer;