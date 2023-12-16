import { configureStore } from '@reduxjs/toolkit'
import businessSlice from "../features/business/businessSlice"
import vendorSlice from '../features/vendor/vendorSlice'
export const store = configureStore({
    reducer: {
        business: businessSlice,
        vendor: vendorSlice,
    },
})