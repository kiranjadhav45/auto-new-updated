import { configureStore } from '@reduxjs/toolkit'
import businessSlice from "../features/business/businessSlice"

export const store = configureStore({
    reducer: {
        business: businessSlice,
    },
})