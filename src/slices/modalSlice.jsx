import { createSlice } from "@reduxjs/toolkit";

const initialState={
    confirmationModal : null
};

const modalSlice = createSlice({
    name:"modal",
    initialState,
    reducers:{
        setConfirmationModal:(state,value)=>{
             state.confirmationModal = value.payload;
        }
    }
})


export const {setConfirmationModal} = modalSlice.actions;
export default modalSlice.reducer;