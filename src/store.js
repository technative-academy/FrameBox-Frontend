import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import thingsReducer from "./slices/thingsSlice";
import usersReducer from "./slices/usersSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        things: thingsReducer,
        users: usersReducer,
    },
});

export default store;
