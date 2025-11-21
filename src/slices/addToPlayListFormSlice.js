import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeApiRequest from "../services/apiService";

// Async thunk to fetch playlists
export const addToPlayListForm = createAsyncThunk(
    "playlists/addToPlayListForm",
    async (playlist) => {
        const response = await makeApiRequest("playlists", {
            method: "POST",
            body: JSON.stringify(playlist),
        });

        return response;
    }
);

const addToPlayListFormSlice = createSlice({
    name: "playlists",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToPlayListForm.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addToPlayListForm.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = "succeeded";
            })
            .addCase(addToPlayListForm.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default addToPlayListFormSlice.reducer;
