import { createSlice } from "@reduxjs/toolkit";

// const initialState = JSON.parse(localStorage.getItem("player")) || {
//   isShowController: false,
//   channelId: "",
//   videoIndex: 0,
// };
const initialState = JSON.parse(localStorage.getItem("player")) || {
  isShowController: false,
  isShowFullCtrl: false,
  channelId: "",
  videoIndex: 0,
  videoId: "",
};

const PlayerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    addPlay: (state, action) => {
      state.isShowController = true;
      state.channelId = action.payload.channelId;
      state.videoIndex = action.payload.videoIndex;
      state.videoId = action.payload.videoId;

      localStorage.setItem(
        "player",
        JSON.stringify({
          isShowController: true,
          channelId: action.payload.channelId,
          videoIndex: action.payload.videoIndex,
          videoId: action.payload.videoId,
        })
      );
    },
  },
});

export default PlayerSlice.reducer;
export const PlayerAction = PlayerSlice.actions;
