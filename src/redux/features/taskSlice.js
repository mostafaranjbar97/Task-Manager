import { createSlice } from "@reduxjs/toolkit";


const taskSlice=createSlice({
    name:"task",
    initialState:{
        isChanged:false,
        itemChanged:null,
    },
    reducers:{
        taskchanged:(state,action)=>{
            state.isChanged= !state.isChanged,
            state.itemChanged= action.payload
            }
    }
})
export const{taskchanged}=taskSlice.actions
export default taskSlice.reducer