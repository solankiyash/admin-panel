import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./projectslice"
import authReducer from "../Features/authSlice";

export const store = configureStore({
    reducer:{
        user:userReducer,
        auth:authReducer
    }
})
