import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeApiRequest from "../services/apiService";

// Async thunk to fetch playlists
export const fetchPlaylists = createAsyncThunk(
    "playlists/fetchPlaylists",
    async () => {
        const data = await makeApiRequest("playlists");
        return data;
    }
);

export const deleteMovieFromPlaylist = createAsyncThunk(
    "movies/deleteMovieFromPlaylist",
    async ({ movieSlug, playlistSlug }) => {
        await makeApiRequest(`playlists/${playlistSlug}/movies`, {
            method: "DELETE",
            body: JSON.stringify({ movies: [movieSlug] }),
        });

        return { movieSlug, playlistSlug };
    }
);

const playlistSlice = createSlice({
    name: "playlists",
    initialState: {
        items: [],
        status: "idle",
        error: null,
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
            })
            .addCase(deleteMovieFromPlaylist.fulfilled, (state) => {
                state.status = "deleted";
            });
    },
});

export default playlistSlice.reducer;
