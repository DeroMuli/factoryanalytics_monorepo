import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apislicer";
import equipmentReducer from "./equipmentstateslicer";

export const store = configureStore({
  reducer: {
    equipment: equipmentReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
