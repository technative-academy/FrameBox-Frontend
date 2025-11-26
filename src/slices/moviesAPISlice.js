import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeApiRequest from "../services/apiService";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
    const data = await makeApiRequest("movies");
    return data;
});

export const deleteMovies = createAsyncThunk(
    "movies/deleteMovies",
    async (movieSlug) => {
        await makeApiRequest(`movies/${movieSlug}`, {
            method: "DELETE",
        });
        return movieSlug;
    }
);

const moviesAPISlice = createSlice({
    name: "movies",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteMovies.fulfilled, (state, action) => {
                state.status = "deleted";
                state.items = state.items.filter(
                    (movie) => movie.slug !== action.payload
                );
            });
    },
});

export default moviesAPISlice.reducer;
