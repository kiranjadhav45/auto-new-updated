// vendorSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialVendorState = {
    value: [
        {
            id: 1,
            employeeCode: 25,
            employeeName: "kiran jadhav",
            employeeEmail: "kiranjadhav@gmail.com",
            employeeMobile: "76201524512",
            employeeAddr: "karad",
            employeeVerify: "pan",
        },
        {
            id: 2,
            employeeCode: 20,
            employeeName: "kiran",
            employeeEmail: "kiranjadhav4515@gmail.com",
            employeeMobile: "76201524512",
            employeeAddr: "karad",
            employeeVerify: "pan",
        },
        {
            id: 3,
            employeeCode: 25,
            employeeName: "kiran jadhav",
            employeeEmail: "kiranjadhav@gmail.com",
            employeeMobile: "76201524512",
            employeeAddr: "karad",
            employeeVerify: "pan",
        },
        {
            id: 4,
            employeeCode: 25,
            employeeName: "kiran jadhav",
            employeeEmail: "kiranjadhav@gmail.com",
            employeeMobile: "76201524512",
            employeeAddr: "karad",
            employeeVerify: "pan",
        },
        {
            id: 5,
            employeeCode: 25,
            employeeName: "kiran jadhav",
            employeeEmail: "kiranjadhav@gmail.com",
            employeeMobile: "76201524512",
            employeeAddr: "karad",
            employeeVerify: "pan",
        },
        {
            id: 6,
            employeeCode: 25,
            employeeName: "kiran jadhav",
            employeeEmail: "kiranjadhav@gmail.com",
            employeeMobile: "76201524512",
            employeeAddr: "karad",
            employeeVerify: "pan",
        },
        {
            id: 7,
            employeeCode: 25,
            employeeName: "kiran jadhav",
            employeeEmail: "kiranjadhav@gmail.com",
            employeeMobile: "76201524512",
            employeeAddr: "karad",
            employeeVerify: "pan",
        },
        {
            id: 8,
            employeeCode: 25,
            employeeName: "kiran jadhav",
            employeeEmail: "kiranjadhav@gmail.com",
            employeeMobile: "76201524512",
            employeeAddr: "karad",
            employeeVerify: "pan",
        },
        {
            id: 9,
            employeeCode: 25,
            employeeName: "kiran jadhav",
            employeeEmail: "kiranjadhav@gmail.com",
            employeeMobile: "76201524512",
            employeeAddr: "karad",
            employeeVerify: "pan",
        },
        {
            id: 10,
            employeeCode: 25,
            employeeName: "kiran jadhav",
            employeeEmail: "kiranjadhav@gmail.com",
            employeeMobile: "76201524512",
            employeeAddr: "karad",
            employeeVerify: "pan",
        },
    ],
};

const employeSlice = createSlice({
    name: "employee",
    initialState: initialVendorState,
    reducers: {
        addEmployee: (state, action) => {
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

        deleteEmployee: (state, action) => {
            const idToDelete = action?.payload;
            if (state.value.length > 0) {
                state.value = state?.value.filter((vendor) => vendor.id !== idToDelete);
                console.log(idToDelete, "action");
            }
        },
    },
});

export const { addEmployee, deleteEmployee } = employeSlice.actions;
export default employeSlice.reducer;
