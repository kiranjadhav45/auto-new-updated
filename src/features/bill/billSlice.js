import { createSlice } from '@reduxjs/toolkit';

const billSlice = createSlice({
    name: 'products',
    initialState: { products: [] },
    reducers: {
        addProduct: (state, action) => {
            let productToAdd = action.payload;
            let existingProduct = state.products.find(item => item._id === productToAdd._id);
            if (existingProduct) {
                let updatedProducts = state.products.map(item => {
                    if (item._id === existingProduct._id) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
                return { ...state, products: updatedProducts };
            } else {
                state.products.push(productToAdd);
            }
        },
        removeProduct: (state, action) => {
            const productIdToRemove = action.payload._id;
            const updatedProducts = state.products.filter(product => product._id !== productIdToRemove);
            return { ...state, products: updatedProducts };
        },
        increseQuantity: (state, action) => {
            const productToIncrease = action.payload;
            const updatedProducts = state.products.map(item => {
                if (item._id === productToIncrease._id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            return { ...state, products: updatedProducts };
        },
        dcreaseQuantity: (state, action) => {
            const productToDecrease = action.payload;
            if (productToDecrease.quantity > 1) {
                const updatedProducts = state.products.map(item => {
                    if (item._id === productToDecrease._id) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                });
                return { ...state, products: updatedProducts };
            } else {
                // If quantity is 1, remove the product from the array
                const updatedProducts = state.products.filter(item => item._id !== productToDecrease._id);
                return { ...state, products: updatedProducts };
            }
        },
    },
});

export const { addProduct, removeProduct, increseQuantity, dcreaseQuantity } = billSlice.actions;
export default billSlice.reducer;