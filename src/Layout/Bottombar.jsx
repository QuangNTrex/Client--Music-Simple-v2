import { NavLink } from "react-router-dom";
import "./Bottombar.css";

const Bottombar = () => {
  return (
    <div className="Bottombar">
      <div className="Bottombar__navbar">
        <div className="Bottombar__navbar-links">
          <NavLink
            to="/channels"
            className={({ isActive }) =>
              !isActive
                ? "Bottombar__navbar-link"
                : "Bottombar__navbar-link active"
            }
          >
            <i className="bi bi-youtube"></i>
            <p className="title">Channels</p>
          </NavLink>
          <NavLink
            to="/playlist"
            className={({ isActive }) =>
              !isActive
                ? "Bottombar__navbar-link"
                : "Bottombar__navbar-link active"
            }
          >
            <i className="bi bi-music-note-list"></i>
            <p className="title">Playlist</p>
          </NavLink>
          <NavLink
            to="/setting"
            className={({ isActive }) =>
              !isActive
                ? "Bottombar__navbar-link"
                : "Bottombar__navbar-link active"
            }
          >
            <i className="bi bi-gear"></i>
            <p className="title">Setting</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Bottombar;
