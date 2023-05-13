import { useDispatch, useSelector } from "react-redux";
import "./ChannelDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import { PlayerAction } from "../store/player";
import { useEffect, useRef, useState } from "react";
import { ChannelAction } from "../store/channels";
import { NotifyActions } from "../store/notify";
import useGetInfo from "../hooks/use-get-info";
import { SystemAction } from "../store/system";
const cacheName = "my-cache";

const ChannelDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const channelId = params.channelId;
  const { getChannelById } = useGetInfo();
  const videoDetailsRef = useRef();
  const timeoutRef = useRef();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("A - Z");
  const [filterVDs, setFilterVDs] = useState([]);
  const { audioFormat, heart, serverAudio } = useSelector(
    (state) => state.system
  );
  const [mapHeart, setMapHeart] = useState(
    new Map(heart.map((vd) => [vd, true]))
  );

  // check sự thay đổi của mảng heart
  useEffect(() => {
    setMapHeart(new Map(heart.map((vd) => [vd, true])));
  }, [heart]);

  useEffect(() => {
    dispatch(ChannelAction.sortChannel({ type: sort, channelId }));
  }, [sort, channelId, dispatch]);

  let channel = getChannelById(channelId);

  let addMusicHandler = (videoIndex, videoDetail) => {
    dispatch(
      NotifyActions.show({
        text: `Loading ${videoDetail.title}`,
        type: "WARNING",
      })
    );
    dispatch(
      PlayerAction.addPlay({
        channelId: channel.channelId,
        videoId: videoDetail.videoId,
        videoIndex,
      })
    );
  };

  const heartHandler = (videoId) => {
    const urlCheck = `${serverAudio}/music/music-check/${videoId}.${audioFormat}?keep=true`;
    const urlExist = `${serverAudio}/music/exist/${videoId}.${audioFormat}`;
    const urlFile = `${serverAudio}/music/file/${videoId}.${audioFormat}`;
    if (audioFormat === "mp3")
      return dispatch(NotifyActions.show({ text: "Mp3 not support heart" }));

    dispatch(NotifyActions.show({ text: "Wating...", type: "WARNING" }));

    // nếu đã lỡ yêu rồi thì chia tay :3
    if (heart.includes(videoId)) {
      setMapHeart((prev) => {
        prev.delete(videoId);
        return prev;
      });
      console.log("hearted, need unheart");
      dispatch(SystemAction.removeHeart({ videoId }));
      caches.open(cacheName).then((cache) => {
        cache.delete(videoId).then((deleted) => {
          if (deleted) dispatch(NotifyActions.show({ text: "Break heart!" }));
        });
      });
      return;
    }
    // cứ show cái heart để người dùng yên tâm, xóa sau :>
    dispatch(SystemAction.addHeart({ videoId }));
    //chưa yêu thì trước tiên check url để chuyển đổi âm thanh
    fetch(urlCheck)
      .then((res) => res.json())
      .then((data) => {
        // sau khi chuyển đổi thì mở cache để lưu
        console.log({ ...data, heart: true });
        caches.open(cacheName).then((cache) => {
          // sau khi mở cache, phải check pại 1 lần nữa
          fetch(urlExist)
            .then((res) => res.json())
            .then((data) => {
              // nếu file tồn tại, thì lấy về và lưu vào cache
              if (data.result) {
                fetch(urlFile)
                  .then((response) => {
                    cache.put(videoId, response);
                    dispatch(NotifyActions.show({ text: "Heart !" }));
                  })
                  .catch((err) => {
                    dispatch(
                      NotifyActions.show({
                        text: "Wrong while heart music!",
                        type: "ERROR",
                      })
                    );
                    dispatch(SystemAction.removeHeart({ videoId }));
                  });
              } else {
                throw new Error();
              }
            })
            .catch((err) => {
              dispatch(
                NotifyActions.show({
                  text: "Wrong while heart music!",
                  type: "ERROR",
                })
              );
              dispatch(SystemAction.removeHeart({ videoId }));
            });
        });
      })
      .catch((err) => {
        dispatch(
          NotifyActions.show({
            text: "Wrong while heart music!",
            type: "ERROR",
          })
        );
        dispatch(SystemAction.removeHeart({ videoId }));
      });
  };

  videoDetailsRef.current = [...channel.videoDetails];

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setFilterVDs(
        videoDetailsRef.current.filter((vd) =>
          vd.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, 500);
  }, [search, videoDetailsRef, sort]);

  if (channel.error) return navigate("/channels");

  return (
    <div className="ChannelDetail">
      <div className="ChannelDetail__filter">
        <div className="ChannelDetail__search">
          <input
            type="text"
            className="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="bi bi-search"></i>
        </div>
        <div className="ChannelDetail__sort-by">
          <select
            name=""
            id=""
            className="select"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="A - Z">A - Z</option>
            <option value="Published At">Published At</option>
          </select>
        </div>
      </div>
      <div className="ChannelDetail__list">
        {filterVDs.map((videoDetail, videoIndex) => {
          if (videoDetail.lengthSeconds <= 7200) {
            return (
              <div
                className="ChannelDetail__list-item"
                key={videoDetail.videoId}
              >
                <div
                  className="list-item-left"
                  onClick={addMusicHandler.bind(null, videoIndex, videoDetail)}
                >
                  <img
                    src={videoDetail.thumbnailUrl}
                    alt="no"
                    className="thumbnail noselect"
                  />
                  <div className="info-wrap">
                    <p className="title noselect">{videoDetail.title}</p>
                    <p className="time noselect">{`${Math.floor(
                      videoDetail.lengthSeconds / 60
                    )}:${
                      Math.floor(videoDetail.lengthSeconds % 60) < 10 ? "0" : ""
                    }${Math.floor(videoDetail.lengthSeconds % 60)}`}</p>
                  </div>
                </div>
                <div
                  className="list-item-right"
                  onClick={heartHandler.bind(null, videoDetail.videoId)}
                >
                  <div className="gr-controller">
                    {mapHeart.has(videoDetail.videoId) ? (
                      <i className="bi bi-heart-fill"></i>
                    ) : (
                      <i className="bi bi-heart"></i>
                    )}
                  </div>
                </div>
              </div>
            );
          } else return null;
        })}
      </div>
    </div>
  );
};

export default ChannelDetail;
