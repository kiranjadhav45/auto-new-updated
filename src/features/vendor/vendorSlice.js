// vendorSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialVendorState = {
    value: [
        {
            id: 1,
            Code: 21,
            Name: "Kiran jadhav",
            Email: "kiran@gmail.com",
            Mobile: 9956126721,
            Address: "New Trentstad, NJ 12026-4105",
        },
        // {
        //   isActive: true,
        //   name: "vendorCode",
        //   placeholder: "Enter Vendor Code",
        //   title: "Vendor Code",
        //   type: "text",
        // },

        {
            id: 2,
            Code: 21,
            Name: "Kiran jadhav",
            Email: "kiran@gmail.com",
            Mobile: 9956126721,
            Address: "New Trentstad, NJ 12026-4105",
        },
        {
            id: 3,
            Code: 21,
            Name: "Kiran jadhav",
            Email: "kiran@gmail.com",
            Mobile: 9956126721,
            Address: "New Trentstad, NJ 12026-4105",
        },
        {
            id: 4,
            Code: 21,
            Name: "Kiran jadhav",
            Email: "kiran@gmail.com",
            Mobile: 9956126721,
            Address: "New Trentstad, NJ 12026-4105",
        },
        {
            id: 5,
            Code: 21,
            Name: "Kiran jadhav",
            Email: "kiran@gmail.com",
            Mobile: 9956126721,
            Address: "New Trentstad, NJ 12026-4105",
        },
        {
            id: 6,
            Code: 21,
            Name: "Kiran jadhav",
            Email: "kiran@gmail.com",
            Mobile: 9956126721,
            Address: "New Trentstad, NJ 12026-4105",
        },
        {
            id: 7,
            Code: 21,
            Name: "Kiran jadhav",
            Email: "kiran@gmail.com",
            Mobile: 9956126721,
            Address: "New Trentstad, NJ 12026-4105",
        },
    ],
};

const vendorSlice = createSlice({
    name: 'vendors',
    initialState: initialVendorState,
    reducers: {
        addVendor: (state, action) => {
            state.vendors.push(action.payload);
        },
        updateVendor: (state, action) => {
            const updatedVendor = action.payload;
            const index = state.vendors.findIndex(vendor => vendor.id === updatedVendor.id);
            if (index !== -1) {
                state.vendors[index] = updatedVendor;
            }
        },
        deleteVendor: (state, action) => {
            const idToDelete = action?.payload;
            state.value = state?.value.filter(vendor => vendor.id !== idToDelete);
            console.log(idToDelete, "action")
        },
    },
});

export const { addVendor, updateVendor, deleteVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
