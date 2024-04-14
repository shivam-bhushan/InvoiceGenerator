import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            console.log("Adding product:", action.payload.id);
            state.push(action.payload);
        },
        deleteProduct: (state, action) => {
            return state.filter((product) => product.id !== action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.findIndex(
                (product) => product.id === action.payload.id
            );
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload.updatedProduct };
            } else {
                console.error(`PID ${action.payload.id} not found`);
            }
        },
    },
});

export const { addProduct, deleteProduct, updateProduct } = productSlice.actions;
export const selectProductList = (state) => state.products;
export default productSlice.reducer;