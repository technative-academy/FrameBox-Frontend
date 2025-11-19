import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import moviesReducer from "./slices/moviesAPISlice";
import playlistReducer from "./slices/playlistSlice";
import usersReducer from "./slices/usersSlice";
import toastReducer from "./slices/toastSlice";
import playListFormReducer from "./slices/playListFormSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        movies: moviesReducer,
        playlists: playlistReducer,
        users: usersReducer,
        toast: toastReducer,
        playListForm: playListFormReducer,
    },
});

export default store;
