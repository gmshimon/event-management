
import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Slice/AuthSlice' 
import eventSlice from './Slice/EventSlice'
export const store = configureStore({
    reducer: {
        user:userSlice,
        event:eventSlice
    }, // Define your reducers here
})