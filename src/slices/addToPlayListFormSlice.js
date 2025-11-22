import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeApiRequest from "../services/apiService";
import { fetchPlaylists } from "./playlistSlice";

// Async thunk to fetch playlists
export const addToPlayListForm = createAsyncThunk(
    "playlists/addToPlayListForm",

    async ({ playlistSlug, movieSlug }) => {
        const response = await makeApiRequest(
            `playlists/${playlistSlug}/movies`,
            {
                method: "POST",
                body: JSON.stringify({ movies: [movieSlug] }),
            }
        );
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
                state.status = "succeeded";
                const updatedPlaylist = action.payload;
                const index = state.items.findIndex(
                    (p) => p.slug === updatedPlaylist.slug
                );
                if (index !== -1) {
                    state.items[index] = updatedPlaylist;
                } else {
                    state.items.push(updatedPlaylist);
                }
            })
            .addCase(addToPlayListForm.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
            });
    },
});

export default addToPlayListFormSlice.reducer;
