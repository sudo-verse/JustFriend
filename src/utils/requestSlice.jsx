import {createSlice} from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers:{
        addRequest:(state,action)=>action.payload,
    }
});
export const{addRequest} = requestSlice.actions;
export default requestSlice.reducer;