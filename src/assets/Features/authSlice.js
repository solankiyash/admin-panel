import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    status:"idle",
    error:null
}

const authSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loginsuccess(state,action){
            state.user = action.payload
            state.status = "succeeded"
        },
        loginFailure(state,action){
            state.error = action.payload
            state.status = "failed"
        },
        signUpSuccess(state, action) {
            state.user = action.payload; 
            state.status = 'succeeded';  
          },
          signUpFailure(state, action) {
            state.error = action.payload; 
            state.status = 'failed';      
          },
          logout(state) {
            state.user = null;          
            state.status = 'idle';  
          },
    }
})

export const  {loginsuccess,loginFailure,signUpFailure,signUpSuccess,logout} = authSlice.actions;
export default authSlice.reducer