import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeApiRequest from "../services/apiService";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
    const data = await makeApiRequest("movies");
    return data;
});

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
            });
    },
});

export default moviesAPISlice.reducer;
