import { configureStore } from "@reduxjs/toolkit";
import contextReducer from "./redux-reducers/contextProvider";
import { apiSlice } from "../logic/apiSlice";

export default configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        context: contextReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
