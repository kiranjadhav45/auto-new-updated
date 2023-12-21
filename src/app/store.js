import { configureStore } from '@reduxjs/toolkit'
import businessSlice from "../features/business/businessSlice"
import vendorSlice from '../features/vendor/vendorSlice'
import employeSlice from '../features/employees/employeSlice'
import tableSlice from '../features/table/tableSlice'
import itemsSlice from '../features/item/itemsSlice'
export const store = configureStore({
    reducer: {
        business: businessSlice,
        vendor: vendorSlice,
        employee: employeSlice,
        table: tableSlice,
        item: itemsSlice,
    },
})