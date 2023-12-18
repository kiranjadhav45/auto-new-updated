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
        // addVendor: (state, action) => {
        //     if (action.payload && Object.keys(action.payload).length > 0) {
        //         if (!Array.isArray(state.value)) {
        //             state.value = [];
        //         }
        //         state.value.push(action.payload);
        //     }
        // },
        addVendor: (state, action) => {
            const newItem = action.payload;

            // Check if the payload is valid and contains an 'id'
            if (newItem && newItem.id) {
                const index = state.value.findIndex(item => item.id === newItem.id);

                if (index !== -1) {
                    // Update item if it exists based on the 'id'
                    state.value[index] = newItem;
                } else {
                    // Add new item if it doesn't exist
                    state.value.push(newItem);
                }
            }
        },

        updateVendor: (state, action) => {
            const updatedVendor = action.payload;
            const index = state.vendors.findIndex(
                (vendor) => vendor.id === updatedVendor.id
            );
            if (index !== -1) {
                state.vendors[index] = updatedVendor;
            }
        },
        deleteVendor: (state, action) => {
            const idToDelete = action?.payload;
            state.value = state?.value.filter((vendor) => vendor.id !== idToDelete);
            console.log(idToDelete, "action");
        },
    },
});

export const { addVendor, updateVendor, deleteVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
