import { useDispatch, useSelector } from "react-redux";
import "./SystemSetting.css";
import { SystemAction } from "../../store/system";

const SystemSetting = () => {
  const audioFormat = useSelector((state) => state.system.audioFormat);
  const serverAudio = useSelector((state) => state.system.serverAudio);

  const dispatch = useDispatch();
  const changeAudioFormatHandler = (e) => {
    dispatch(SystemAction.setAudioFormat({ audioFormat: e.target.value }));
  };
  const changeServerAudioHandler = (e) => {
    dispatch(SystemAction.setServerAudio({ serverAudio: e.target.value }));
  };

  return (
    <div className="SystemSetting">
      <div className="wrap">
        <div className="SystemSetting__setting">
          <h3>Audio</h3>
          <div className="wrap-setting">
            <div className="each-setting">
              <p className="title">Audio format: </p>
              <select
                className="select"
                value={audioFormat}
                onChange={changeAudioFormatHandler}
              >
                <option value="mp3">MP3 (Not sp IOS)</option>
                <option value="wav">WAV</option>
                <option value="aiff">AIFF</option>
                <option value="flac">FLAC</option>
                <option value="au">AU</option>
                <option value="m4a">M4A (more time)</option>
                <option value="aac">AAC (more time)</option>
                <option value="ogg">OGG (more time)</option>
                <option value="wma">WMA (more time)</option>
              </select>
            </div>
          </div>
        </div>

        <div
          className="SystemSetting__setting"
          onChange={changeServerAudioHandler}
        >
          <h3>Server Audio</h3>
          <div className="wrap-setting">
            <div className="each-setting">
              <p className="title">Choosen Server: </p>
              <select
                className="select"
                onChange={changeServerAudioHandler}
                value={serverAudio}
              >
                <option value="https://musicserveronly-a.onrender.com">
                  Server 1 (Render)
                </option>
                <option value="https://servermusiconly-b.onrender.com">
                  Server 2 (Render)
                </option>
                <option value="https://musicserveronly-c.onrender.com">
                  Server 3 (Render)
                </option>
                <option value="https://prong-marked-gruyere.glitch.me">
                  Server 4 (Glitch)
                </option>
                <option value="https://efficacious-denim-wealth.glitch.me">
                  Server 5 (Glitch)
                </option>
                <option value="https://shorthaired-continuous-pie.glitch.me">
                  Server 6 (Glitch)
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSetting;
