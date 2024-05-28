import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IGlobalSlice {
  showFooter: boolean;
}

const initialState: IGlobalSlice = {
  showFooter: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setShowFooter: (state, action: PayloadAction<boolean>) => {
      state.showFooter = action.payload;
    },
  },
});

export const { setShowFooter } = globalSlice.actions;
export default globalSlice.reducer;
