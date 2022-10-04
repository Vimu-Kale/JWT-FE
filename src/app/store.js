import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userAuthReducer from "./slices/userAuthSlice";
import userPostsReducer from "./slices/userPostsSlice";

const rootReducer = combineReducers({
  userAuth: userAuthReducer,
  userPosts: userPostsReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["userAuth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);
export { store, persistor };
