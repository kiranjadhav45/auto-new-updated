// vendorSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialVendorState = {
    value: [
        {
            id: 1,
            vendorAddr: "sas",
            vendorCode: "jkjj",
            vendorEmail: "asas",
            vendorMobile: "asasasa",
            vendorName: "sas",
        },
        {
            id: 2,
            vendorAddr: "sas",
            vendorCode: "jkjj",
            vendorEmail: "asas",
            vendorMobile: "asasasa",
            vendorName: "sas",
        },
        {
            id: 3,
            vendorAddr: "sas",
            vendorCode: "jkjj",
            vendorEmail: "asas",
            vendorMobile: "asasasa",
            vendorName: "sas",
        },
        {
            id: 4,
            vendorAddr: "sas",
            vendorCode: "jkjj",
            vendorEmail: "asas",
            vendorMobile: "asasasa",
            vendorName: "sas",
        },
        {
            id: 5,
            vendorAddr: "sas",
            vendorCode: "jkjj",
            vendorEmail: "asas",
            vendorMobile: "asasasa",
            vendorName: "sas",
        },
        {
            id: 6,
            vendorAddr: "sas",
            vendorCode: "jkjj",
            vendorEmail: "asas",
            vendorMobile: "asasasa",
            vendorName: "sas",
        },
        {
            id: 7,
            vendorAddr: "sas",
            vendorCode: "jkjj",
            vendorEmail: "asas",
            vendorMobile: "asasasa",
            vendorName: "sas",
        },

    ],
};

const vendorSlice = createSlice({
    name: "vendors",
    initialState: initialVendorState,
    reducers: {
        addVendor: (state, action) => {
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

        deleteVendor: (state, action) => {
            const idToDelete = action?.payload;
            if (state.value.length > 0) {
                state.value = state?.value.filter((vendor) => vendor.id !== idToDelete);
                console.log(idToDelete, "action");
            }
        },
    },
});

export const { addVendor, updateVendor, deleteVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
