import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: JSON.parse(localStorage.getItem("channels")) || [],
};

const ChannelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    addChannels: (state, action) => {
      state.channels = action.payload.channels;
      localStorage.setItem("channels", JSON.stringify(action.payload.channels));
      localStorage.setItem(
        "timeUpdatedAtChannel",
        (Date.now() + 1000 * 60 * 60 * 5).toString()
      );
    },
    addChannel: (state, action) => {
      const updateChannels = [...state.channels, action.payload.channel];
      state.channels = updateChannels;
      localStorage.setItem("channels", JSON.stringify(updateChannels));
      localStorage.setItem("timeUpdatedAtChannel", Date.now().toString());
    },
    sortChannel: (state, action) => {
      const type = action.payload.type;
      const channelId = action.payload.channelId;
      // lấy toàn bộ video của videdoDetail của channel rồi sort lại
      let sortedVideoDetails = [
        ...state.channels.filter(
          (channel) => channel.channelId === channelId
        )[0].videoDetails,
      ].sort((vd1, vd2) => {
        if (type === "A - Z") return vd1.title.localeCompare(vd2.title);
        else if (type === "Published At")
          return Date.parse(vd2.publishDate) - Date.parse(vd1.publishDate);
        else return 1;
      });

      state.channels = state.channels.map((channel) => {
        if (channel.channelId === channelId)
          return { ...channel, videoDetails: sortedVideoDetails };
        return channel;
      });
      localStorage.setItem("channels", JSON.stringify(state.channels));
    },
  },
});

export default ChannelSlice.reducer;
export const ChannelAction = ChannelSlice.actions;
