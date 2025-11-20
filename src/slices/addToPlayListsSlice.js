import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeApiRequest from "../services/apiService";

// Async thunk to fetch playlists
export const addToPlayLists = createAsyncThunk(
    "playlists/addToPlaylists",
    async (playlist) => {
        const response = await makeApiRequest("playlists", {
            method: "POST",
            body: JSON.stringify(playlist),
        });

        return response;
    }
);

const addToPlayListsSlice = createSlice({
    name: "playlists",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToPlayLists.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addToPlayLists.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = "succeeded";
            })
            .addCase(addToPlayLists.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default addToPlayListsSlice.reducer;
