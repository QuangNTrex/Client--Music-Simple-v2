import { configureStore } from "@reduxjs/toolkit";
import ChannelReducer from "./channels";
import PlayerReducer from "./player";
import NotifyReducer from "./notify";
import SystemReducer from "./system";

const store = configureStore({
  reducer: {
    channel: ChannelReducer,
    player: PlayerReducer,
    notify: NotifyReducer,
    system: SystemReducer,
  },
});

export default store;
