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
import { encryptTransform } from "redux-persist-transform-encrypt";

const rootReducer = combineReducers({
  userAuth: userAuthReducer,
  userPosts: userPostsReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["userAuth"],
  transforms: [
    encryptTransform({
      secretKey: `7a741e0a612a07644b936f1fbf88ff909ecec6fbdde36f993
      c968e955b790f400d0a2ae77da7f89c6f40330180739c4932e
      d4b5f777ef9dbda76e6f20065f2de`,
    }),
  ],
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
