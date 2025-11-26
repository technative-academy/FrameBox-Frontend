import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeApiRequest from "../services/apiService";

// Async thunk to post movies
export const addPlaylists = createAsyncThunk(
    "playlists/addMovie",
    async (playlist) => {
        const response = await makeApiRequest("movies", {
            method: "POST",
            body: JSON.stringify(playlist),
        });

        return response;
    }
);

const addMovieSlice = createSlice({
    name: "playlists",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPlaylists.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addPlaylists.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = "succeeded";
            })
            .addCase(addPlaylists.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default addMovieSlice.reducer;
