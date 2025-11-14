// src/slices/playlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch playlists
export const fetchPlaylists = createAsyncThunk(
    "playlists/fetchPlaylists",
    async () => {
        // Example fetch — replace with your actual API or data source
        const response = await fetch("/api/playlists");
        const data = await response.json();
        return data;
    }
);

const playlistSlice = createSlice({
    name: "playlists",
    initialState: {
        items: [], // ✅ must exist
        status: "idle", // ✅ must exist
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaylists.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPlaylists.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchPlaylists.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default playlistSlice.reducer;
