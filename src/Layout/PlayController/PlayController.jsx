import { useDispatch, useSelector } from "react-redux";
import "./PlayController.css";
import { useEffect, useRef, useState } from "react";
import { PlayerAction } from "../../store/player";
import { NotifyActions } from "../../store/notify";
import useGetInfo from "../../hooks/use-get-info";
const cacheName = "my-cache";

const PlayController = () => {
  let videoIdNext, videoTitle, videoDetail, channel;
  const { getChannelById, getVideoDetailById, getNextVideoDetailById } =
    useGetInfo();
  const dispatch = useDispatch();
  const audioRef = useRef();
  const intervalRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [urlMusic, setUrlMusic] = useState(null);

  const serverAudio = useSelector((state) => state.system.serverAudio);
  const audioFormat = useSelector((state) => state.system.audioFormat);
  const { isShowController, channelId, videoId } = useSelector(
    (state) => state.player
  );

  if (videoId && channelId) {
    channel = getChannelById(channelId);
    videoDetail = getVideoDetailById(channelId, videoId);
    videoTitle = videoDetail.title;
    videoIdNext = getNextVideoDetailById(channelId, videoId).videoId;
  }

  const playAudioHandler = () => {
    setIsPlaying((prev) => !prev);
  };

  const nextAudioHandler = () => {
    if (!videoIdNext) return;
    dispatch(
      PlayerAction.addPlay({
        channelId,
        videoId: videoIdNext,
      })
    );
    setTimeout(() => {
      setIsPlaying(true);
    }, 300);
  };

  // add play while click toggle play
  useEffect(() => {
    if (isShowController && audioRef && audioRef.current) {
      if (isPlaying && urlMusic) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [urlMusic, isShowController, isPlaying, audioRef]);

  // set liên tục fetch
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (audioFormat !== "mp3")
      intervalRef.current = setInterval(() => {
        fetch(`${serverAudio}/music/music-check/${videoId}.${audioFormat}`)
          .then((res) => res.json())
          .then((data) => {
            console.log({ ...data, inSetInterval: true });
          });
      }, 1000 * 60);
  }, [intervalRef, videoId, audioFormat, serverAudio]);

  useEffect(() => {
    console.log(`${videoId}.${audioFormat}`);
    const urlCheckMusic = `${serverAudio}/music/music-check/${videoId}.${audioFormat}`;
    const urlMusicMp3 = `${serverAudio}/music/mp3/${videoId}.${audioFormat}`;
    const musicId = videoId;

    if (!isShowController) return;
    if (audioFormat === "mp3") {
      setUrlMusic(urlMusicMp3);
      return;
    }
    caches.open(cacheName).then(async (cache) => {
      // check coi có nhạc trong cache không?
      const response = await cache.match(musicId);
      // nếu đã lưu vào cache thì tải về
      if (response) {
        const blob = await response.blob();
        console.log("listen music in cache!");
        setUrlMusic(URL.createObjectURL(blob));
        return;
      }

      // nếu chưa lưu thì load thôi :>
      setUrlMusic(null);
      console.log(`start load in ${serverAudio}`);
      fetch(urlCheckMusic)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let localVideoId = JSON.parse(localStorage.getItem("player")).videoId;
          let localAudioFormat = localStorage.getItem("audioFormat") || "wav";
          if (data.error)
            return dispatch(
              NotifyActions.show({
                text: `Has error! ${videoTitle}`,
                type: "ERROR",
              })
            );
          if (data.result.warning)
            dispatch(
              NotifyActions.show({
                text: data.result.message,
                type: "WARNING",
              })
            );

          if (data.result.url.includes(localVideoId + "." + localAudioFormat)) {
            setUrlMusic(`${serverAudio}/musics/${videoId}.${audioFormat}`);
          }
          dispatch(NotifyActions.show({ text: `Loader ${videoTitle}` }));
          return fetch(
            `${serverAudio}/music/music-check/${videoIdNext}.${audioFormat}?keep=true`
          );
        })
        .catch((err) => console.log(err));
    });
  }, [
    isShowController,
    videoId,
    videoTitle,
    audioFormat,
    videoIdNext,
    serverAudio,
    dispatch,
  ]);

  if (!isShowController || !channel) return <div />;
  document.title = videoTitle;
  return (
    <div className={`PlayController ${isShowController ? "" : "hidden"}`}>
      <div className="PlayController__wrap-info">
        <img src={videoDetail.thumbnailUrl} alt="" className="thumbnail" />
        <p className="title noselect">{videoDetail.title.slice(0, 30)}</p>
      </div>
      <div className="PlayController__wrap-button">
        <div className="play_pause" onClick={playAudioHandler}>
          <i className={`bi bi-${isPlaying ? "pause" : "play"}-fill`}></i>
        </div>
        <div className="next" onClick={nextAudioHandler}>
          <i className="bi bi-heart-arrow"></i>
        </div>
      </div>
      <audio
        className="hidden"
        ref={audioRef}
        onEnded={nextAudioHandler}
        src={urlMusic}
        onLoadedData={() => {
          dispatch(NotifyActions.show({ text: `Can Play! ${videoTitle}` }));
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      ></audio>
    </div>
  );
};
export default PlayController;
