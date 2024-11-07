import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData:null,
    loading: false,
    token: localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")) : null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setsignupData: (state,value)=>{
            state.signupData = value.payload
        },
        setToken: (state,value)=>{
            state.token = value.payload;
        },
        setLoading: (state,value)=>{
            state.loading = value.payload
        }
    }
})

export const {setsignupData, setToken,setLoading} = authSlice.actions
export default authSlice.reducer;