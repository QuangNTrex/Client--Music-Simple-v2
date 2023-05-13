import { NavLink } from "react-router-dom";
import "./Playlist.css";

const Playlist = () => {
  return (
    <div className="Playlist">
      <div className="Playlist__links">
        <NavLink to="/playlist/love" className="Playlist__links_link">
          <i className="bi bi-heart noselect"></i>
          <p className="title noselect">Love</p>
        </NavLink>
        <NavLink to="/playlist/music" className="Playlist__links_link">
          <i className="bi bi-music-note-beamed"></i>
          <p className="title noselect">Music</p>
        </NavLink>
      </div>
      <p>coming soon...</p>
    </div>
  );
};

export default Playlist;
