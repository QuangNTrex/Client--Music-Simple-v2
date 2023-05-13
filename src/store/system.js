import { createSlice } from "@reduxjs/toolkit";

const heartName = "heart";

if (!localStorage.getItem("serverAudio"))
  localStorage.setItem("serverAudio", "https://musicserveronly-a.onrender.com");

if (!localStorage.getItem("audioFormat"))
  localStorage.setItem("audioFormat", "wav");

let localHeart = JSON.parse(localStorage.getItem(heartName)) || [];

const initialState = {
  audioFormat: localStorage.getItem("audioFormat") || "wav",
  serverAudio:
    localStorage.getItem("serverAudio") ||
    "https://musicserveronly-a.onrender.com",
  heart: localHeart,
};

const SystemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setAudioFormat: (state, action) => {
      state.audioFormat = action.payload.audioFormat || "wav";
      localStorage.setItem("audioFormat", action.payload.audioFormat || "wav");
    },
    setServerAudio: (state, action) => {
      state.serverAudio = action.payload.serverAudio;
      localStorage.setItem("serverAudio", action.payload.serverAudio);
    },
    addHeart: (state, action) => {
      const newStateHeart = [...state.heart, action.payload.videoId];
      state.heart = newStateHeart;
      localStorage.setItem(heartName, JSON.stringify(newStateHeart));
    },
    removeHeart: (state, action) => {
      const videoId = action.payload.videoId;
      console.log(state.heart.length);
      const currentStateHeart = state.heart.filter((key) => key !== videoId);
      console.log(currentStateHeart.length);
      state.heart = currentStateHeart;
      localStorage.setItem(heartName, JSON.stringify(currentStateHeart));
    },
  },
});

export default SystemSlice.reducer;
export const SystemAction = SystemSlice.actions;
