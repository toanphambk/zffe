import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "redux";

//UI Slices
import sidebarReducer from "./UI/sideBarSlice";
import loginReducer from "./UI/loginSlice";
import modalReducer from "./UI/modalSlice";
import settingPageReducer from "./UI/settingPageSlice";


//data Slices
import authReducer from "./data/authSlice";
import portsSettingReducer from "./data/portsSettingSlice"
import serialPortStateReducer from './data/serialPortStateSlice';
import appSettingReducer from './data/appSettingSlice';

//Api middleware
import { api } from './services/api';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  settingPageReducer,
  sidebarReducer,
  authReducer,
  loginReducer,
  modalReducer,
  portsSettingReducer,
  serialPortStateReducer,
  appSettingReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [api.reducerPath, 'modalReducer', "settingPageReducer", "serialPortStateReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, "modal/setModal"],
        ignoredPaths: ["modalReducer.childComponent"],
      },
    }).concat(api.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
