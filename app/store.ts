import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./features/appSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./services/apiServices";

export const store = configureStore({
  reducer: {
    app: appSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
