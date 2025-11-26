import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import moviesReducer from "./slices/moviesAPISlice";
import playlistReducer from "./slices/playlistSlice";
import usersReducer from "./slices/usersSlice";
import toastReducer from "./slices/toastSlice";
import playListFormReducer from "./slices/playListFormSlice";
import addToPlayListFormReducer from "./slices/addToPlayListFormSlice";
import addToMovieReducer from "./slices/addMoviesSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        movies: moviesReducer,
        playlists: playlistReducer,
        users: usersReducer,
        toast: toastReducer,
        playListForm: playListFormReducer,
        addToPlayListForm: addToPlayListFormReducer,
        addMovieForm: addToMovieReducer,
    },
});

export default store;
