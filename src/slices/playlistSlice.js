import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeApiRequest from "../services/apiService";
import { addToPlayListForm } from "./addToPlayListFormSlice";

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

export const deletePlaylist = createAsyncThunk(
    "playlists/deletePlaylist",
    async (playlistSlug) => {
        await makeApiRequest(`playlists/${playlistSlug}`, {
            method: "DELETE",
        });

        return playlistSlug;
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
            .addCase(deleteMovieFromPlaylist.fulfilled, (state, action) => {
                state.status = "deleted";
                const { movieSlug, playlistSlug } = action.payload;

                const playlist = state.items.find(
                    (p) => p.slug === playlistSlug
                );

                if (playlist) {
                    playlist.movies = playlist.movies.filter(
                        (m) => m !== movieSlug
                    );
                }
            })
            .addCase(addToPlayListForm.fulfilled, (state, action) => {
                const updatedPlaylist =
                    action.payload?.playlist || action.payload;

                if (!updatedPlaylist || !updatedPlaylist.slug) {
                    return;
                }

                const existingIndex = state.items.findIndex(
                    (p) => p.slug === updatedPlaylist.slug
                );

                if (existingIndex !== -1) {
                    state.items[existingIndex] = updatedPlaylist;
                } else {
                    state.items.push(updatedPlaylist);
                }
            })
            .addCase(deletePlaylist.fulfilled, (state, action) => {
                const playlistSlug = action.payload;
                state.items = state.items.filter(
                    (p) => p.slug !== playlistSlug
                );
            });
    },
});

export default playlistSlice.reducer;
