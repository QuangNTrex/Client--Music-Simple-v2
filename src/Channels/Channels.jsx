import { useSelector } from "react-redux";
import "./Channels.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormChannelPopup from "./FormChannelPopup";

const Channels = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const channels = useSelector((state) => state.channel.channels);
  const closePopupHandler = () => {
    setShowForm(false);
  };
  return (
    <div className="Channels">
      <div
        className="Channels__add-channel"
        onClick={() => setShowForm((prev) => !prev)}
      >
        <div className="wrap">
          <i className="bi bi-plus-lg noselect"></i>
          <p className="title noselect">Add channel</p>
        </div>
      </div>
      <div className="Channels__list">
        {channels.map((channel) => {
          return (
            <div
              key={channel.channelId}
              className="Channels__list_channel-item"
              onClick={() => navigate(`/channels/${channel.channelId}`)}
            >
              <img
                src={channel.thumbnail}
                alt=""
                className="thumbnail noselect"
              />
              <p className="title noselect">{channel.channelTitle}</p>
            </div>
          );
        })}
      </div>
      {showForm && <FormChannelPopup onClosePopup={closePopupHandler} />}
    </div>
  );
};

export default Channels;
