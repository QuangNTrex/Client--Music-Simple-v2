import { useState } from "react";
import "./FormChannelPopup.css";
import { HTTPPOST } from "../lib/http";
import { useDispatch } from "react-redux";
import { ChannelAction } from "../store/channels";

const FormChannelPopup = ({ onClosePopup }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [listChannel, setListChannel] = useState([]);
  const searchChannelHandler = () => {
    HTTPPOST("/channel/search-list-channel", { q: search }).then((data) => {
      if (data && data.result) {
        console.log(data.result.lists);
        setListChannel(data.result.lists);
      }
    });
  };
  const addChannelHandler = (channel) => {
    onClosePopup();
    console.log("on add channel");
    HTTPPOST("/channel/add-channel", { channel: channel }).then((data) => {
      console.log(data);
      if (data && data.result)
        dispatch(ChannelAction.addChannel({ channel: data.result.channel }));
    });
  };
  return (
    <div className="FormChannelPopup">
      <div className="FormChannelPopup__form">
        <i className="bi bi-x-lg close" onClick={onClosePopup}></i>
        <div className="form-input">
          <input
            type="text"
            placeholder="Channel Name..."
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) searchChannelHandler();
            }}
          />
          <i className="bi bi-search" onClick={searchChannelHandler}></i>
        </div>
        <div className="FormChannelPopup__list-answer">
          {listChannel.map((channel) => {
            return (
              <div
                className="channel"
                key={channel.id.channelId}
                onClick={addChannelHandler.bind(null, channel)}
              >
                <img
                  src={channel.snippet.thumbnails.medium.url}
                  alt=""
                  className="thumbnail noselect"
                />
                <div className="info-wrap">
                  <p className="title noselect">
                    {channel.snippet.channelTitle}
                  </p>
                  <p className="desc noselect">
                    {channel.snippet.description.slice(0, 40)}...
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormChannelPopup;
