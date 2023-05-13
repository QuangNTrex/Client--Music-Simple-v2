import { useSelector } from "react-redux";

const useGetInfo = () => {
  const channels = useSelector((state) => state.channel.channels);
  const getChannelById = (channelId) => {
    const channel = channels.filter(
      (channel) => channel.channelId === channelId
    )[0] || { error: true };
    return channel;
  };

  const getVideoDetailById = (channelId, videoId) => {
    const channel = channels.filter(
      (channel) => channel.channelId === channelId
    )[0] || { error: true };
    if (channel.error) return { error: true };
    const videoDetail = channel.videoDetails.filter(
      (vd) => vd.videoId === videoId
    )[0];

    return videoDetail || { error: true };
  };

  const getNextVideoDetailById = (channelId, videoId) => {
    if (!channelId || !videoId) return { error: true };
    const channel = channels.filter(
      (channel) => channel.channelId === channelId
    )[0];
    if (!channel) return { error: true };

    let nextVideoIndex = 0;
    channel.videoDetails.forEach((vd, i) => {
      if (vd.videoId === videoId) nextVideoIndex = i + 1;
    });

    return channel.videoDetails[nextVideoIndex] || {};
  };

  return { getChannelById, getVideoDetailById, getNextVideoDetailById };
};

export default useGetInfo;
