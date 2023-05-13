import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HTTP } from "./lib/http";
import { ChannelAction } from "./store/channels";
import Channels from "./Channels/Channels";
import ChannelDetail from "./Channels/ChannelDetail";
import SettingPage from "./pages/SettingPage";
import Playlist from "./component/Playlist/Playlist";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Music Chill";
    HTTP("/channel/relate").then((data) => {
      console.log(data);
      if (data && data.result) {
        if (
          Number(localStorage.getItem("timeUpdatedAtChannel") || "0") <
          data.result.time
        )
          HTTP("/channel/channels").then((data) => {
            console.log(data);
            if (data && data.result) {
              dispatch(
                ChannelAction.addChannels({ channels: data.result.channels })
              );
            }
          });
      }
    });
  }, [dispatch]);

  return (
    <div className="dark">
      <Layout>
        <Routes>
          <Route path="/channels" element={<Channels />} />
          <Route path="/channels/:channelId" element={<ChannelDetail />} />

          <Route path="/playlist" element={<Playlist />} />

          <Route path="/setting" element={<SettingPage />} />
          <Route path="*" element={<Navigate to="/channels" />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
