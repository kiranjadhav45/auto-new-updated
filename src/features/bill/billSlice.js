import { createSlice } from '@reduxjs/toolkit';

const billSlice = createSlice({
    name: 'products',
    initialState: { products: [] },
    reducers: {
        // addBill: (state, action) => {
        //     state.products = action.payload
        // },
        addBill: (state, action) => {
            const newProducts = action.payload;
            // Check if state.products exists and is an array
            if (Array.isArray(state.products)) {
                // Append the new products to the existing ones
                const updatedProducts = [...newProducts];
                return { products: updatedProducts };
            } else {
                // If state.products is not properly initialized, set it to the new products
                return { ...state, products: newProducts };
            }
        },

        // addProduct: (state, action) => {
        //     let productToAdd = action.payload;
        //     let existingProduct = state.products.find(item => item._id === productToAdd._id);
        //     if (existingProduct) {
        //         let updatedProducts = state.products.map(item => {
        //             if (item._id === existingProduct._id) {
        //                 return { ...item, quantity: item.quantity + 1 };
        //             }
        //             return item;
        //         });
        //         return { ...state, products: updatedProducts };
        //     } else {
        //         state.products.push(productToAdd);
        //     }
        // },
        addProduct: (state, action) => {
            let productToAdd = action.payload;
            console.log(action, "action");

            // Check if state or state.products is undefined or not an array
            if (!state || !Array.isArray(state.products)) {
                // Handle the scenario when state or state.products is not properly initialized
                return { ...state, products: [productToAdd] }; // Initialize with the new product
            }

            let existingProduct = state.products.find(item => item?._id === productToAdd?._id);

            if (existingProduct) {
                let updatedProducts = state.products.map(item => {
                    if (item._id === existingProduct._id) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
                return { ...state, products: updatedProducts };
            } else {
                // Create a new array by concatenating the existing products with the new productToAdd
                let updatedProducts = [...state.products, productToAdd];
                return { ...state, products: updatedProducts };
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
        removeAllProducts: (state) => {
            return { ...state, products: [] }; // Reset products to an empty array
        },
    },
});

export const { addProduct, removeProduct, increseQuantity, dcreaseQuantity, removeAllProducts, addBill } = billSlice.actions;
export default billSlice.reducer;