import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  text: "Loading...",
  type: "NOTIFY",
  // type:"NOTiFY", "ERROR", "WARNING"
};

const NotifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    show: (state, action) => {
      state.show = true;
      state.text = action.payload.text || "Loading...";
      state.type = action.payload.type || "NOTIFY";
    },
    hide: (state, action) => {
      state.show = false;
    },
  },
});

export default NotifySlice.reducer;
export const NotifyActions = NotifySlice.actions;
