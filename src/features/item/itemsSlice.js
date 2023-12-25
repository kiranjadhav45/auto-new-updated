// vendorSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialVendorState = {
    value: [
        {
            id: 1,
            itemCode: "sas",
            itemName: "jkjj",
            itemCategory: "asas",
            itemSubCategory: "asasasa",
            itemPrice: "sas",
            ingredients: "sas",
            recipe: "sas",
            allergen: "sas",
            portionSize: "sas",
            status: "sas",
            tax: "sas",
            discount: "sas",
            images: "sas",
            currentStock: "sas",
            barcode: "sas",
            salesHistory: "sas",
            customNotes: "sas",
        },

    ],
};

const itemsSlice = createSlice({
    name: "vendors",
    initialState: initialVendorState,
    reducers: {
        updateState: (state, action) => {
            action.payload = state.value
        },
        addItem: (state, action) => {
            const newItem = action.payload;

            // Check if the payload is valid
            if (newItem) {
                // Check if the payload has an 'id' property
                if (!newItem.id) {
                    // Generate a unique 6-digit number as the 'id'
                    const uniqueId = Math.floor(100000 + Math.random() * 900000);
                    newItem.id = uniqueId.toString();
                }

                // Find the item by 'id'
                const existingItem = state.value.find(item => item.id === newItem.id);

                if (existingItem) {
                    // Update item if it exists based on the 'id'
                    Object.assign(existingItem, newItem);
                } else {
                    // Add new item if it doesn't exist
                    state.value.push(newItem);
                }
            }
        },

        deleteItem: (state, action) => {
            const idToDelete = action?.payload;
            if (state.value.length > 0) {
                state.value = state?.value.filter((vendor) => vendor.id !== idToDelete);
                console.log(idToDelete, "action");
            }
        },
    },
});

export const { addItem, deleteItem, updateState } = itemsSlice.actions;
export default itemsSlice.reducer;
