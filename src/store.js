import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import moviesReducer from "./slices/moviesAPISlice";
import playlistReducer from "./slices/playlistSlice";
import usersReducer from "./slices/usersSlice";
import toastReducer from "./slices/toastSlice";
import { playlists } from "./playlist-data";

const store = configureStore({
    reducer: {
        auth: authReducer,
        movies: moviesReducer,
        playlists: playlistReducer,
        users: usersReducer,
        toast: toastReducer,
    },
});

export default store;
