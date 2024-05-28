import { useDispatch, useStore } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import GlobalReducer from "./slices/global.slice";
import { useSelector } from "react-redux";

export const makeStore = () =>
  configureStore({
    reducer: GlobalReducer,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
