import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: [],

    reducers: {
        addFeed: (state, action) => action.payload,

        appendFeed: (state, action) => {
            // Append new users, avoiding duplicates
            const existingIds = new Set(state.map(u => u._id));
            const newUsers = action.payload.filter(u => !existingIds.has(u._id));
            return [...state, ...newUsers];
        },

        removeFeed: () => {
            return null;
        },
    },
});

export const { addFeed, appendFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;