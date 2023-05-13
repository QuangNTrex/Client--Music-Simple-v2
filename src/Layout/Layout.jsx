import Bottombar from "./Bottombar";
import Content from "./Content";
import "./Layout.css";
import NotifyPopup from "./NotifyPopup/NotifyPopup";
import FullPlayCtrl from "./PlayController/FullPlayCtrl";
import PlayController from "./PlayController/PlayController";

const Layout = (props) => {
  return (
    <div className="Layout">
      <Content>{props.children}</Content>
      <Bottombar />
      <PlayController />
      <NotifyPopup />
      <FullPlayCtrl />
    </div>
  );
};

export default Layout;
