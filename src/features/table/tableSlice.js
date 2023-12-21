// vendorSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialVendorState = {
    value: [
        {
            id: 1,
            tableCode: 25,
            tableName: "kiran jadhav",
            tableStatus: "kiranjadhav@gmail.com",
            tablePlacement: "76201524512",
            tableQR: "karad",
        },
        {
            id: 2,
            tableCode: 25,
            tableName: "kiran jadhav",
            tableStatus: "kiranjadhav@gmail.com",
            tablePlacement: "76201524512",
            tableQR: "karad",
        },
        {
            id: 3,
            tableCode: 25,
            tableName: "kiran jadhav",
            tableStatus: "kiranjadhav@gmail.com",
            tablePlacement: "76201524512",
            tableQR: "karad",
        },
        {
            id: 4,
            tableCode: 25,
            tableName: "kiran jadhav",
            tableStatus: "kiranjadhav@gmail.com",
            tablePlacement: "76201524512",
            tableQR: "karad",
        },
        {
            id: 5,
            tableCode: 25,
            tableName: "kiran jadhav",
            tableStatus: "kiranjadhav@gmail.com",
            tablePlacement: "76201524512",
            tableQR: "karad",
        },
        {
            id: 6,
            tableCode: 25,
            tableName: "kiran jadhav",
            tableStatus: "kiranjadhav@gmail.com",
            tablePlacement: "76201524512",
            tableQR: "karad",
        },
        {
            id: 7,
            tableCode: 25,
            tableName: "kiran jadhav",
            tableStatus: "kiranjadhav@gmail.com",
            tablePlacement: "76201524512",
            tableQR: "karad",
        },
        {
            id: 8,
            tableCode: 25,
            tableName: "kiran jadhav",
            tableStatus: "kiranjadhav@gmail.com",
            tablePlacement: "76201524512",
            tableQR: "karad",
        },
        {
            id: 9,
            tableCode: 25,
            tableName: "kiran jadhav",
            tableStatus: "kiranjadhav@gmail.com",
            tablePlacement: "76201524512",
            tableQR: "karad",
        },
        {
            id: 10,
            tableCode: 25,
            tableName: "kiran jadhav",
            tableStatus: "kiranjadhav@gmail.com",
            tablePlacement: "76201524512",
            tableQR: "karad",
        },

    ],
};

const tableSlice = createSlice({
    name: "table",
    initialState: initialVendorState,
    reducers: {
        addTable: (state, action) => {
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

        deleteTable: (state, action) => {
            const idToDelete = action?.payload;
            if (state.value.length > 0) {
                state.value = state?.value.filter((vendor) => vendor.id !== idToDelete);
                console.log(idToDelete, "action");
            }
        },
    },
});

export const { addTable, deleteTable } = tableSlice.actions;
export default tableSlice.reducer;
