import axios from "axios";
import { HomePageVideos } from "../types";
import { parseVideoDuration } from "./parseVideoDuration";
import { convertRawViewTOString } from "./convertRawViewTOString";
import { timeSince } from "./timeSince";

const API_KEY = process.env.REACT_APP_YOUTUBE_APP_DATA_API_KEY;

export const parseHomePageVideos = async (items: any[]) => {
  try {
    const videoIds: string[] = [];
    const channelIds: string[] = [];

    items.forEach(
      (item: { snippet: { channelId: string }; id: { videoId: string } }) => {
        videoIds.push(item.id.videoId);
        channelIds.push(item.snippet.channelId);
      }
    );

    const {
      data: { items: videosData },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );
    console.log(videosData);

    const {
      data: { items: channelsData },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelIds.join(
        ","
      )}&key=${API_KEY}`
    );
    console.log(channelsData);

    const parsedChannelData: { id: string; image: string }[] = [];
    channelsData.forEach(
      (channel: {
        id: string;
        snippet: { thumbnails: { default: { url: string } } };
      }) =>
        parsedChannelData.push({
          id: channel.id,
          image: channel.snippet.thumbnails.default.url,
        })
    );

    const actualData: HomePageVideos[] = [];

    items.forEach(
      (
        item: {
          snippet: {
            channelId: string;
            title: string;
            description: string;
            thumbnails: { medium: { url: string } };
            publishedAt: Date;
            channelTitle: string;
          };
          id: { videoId: string };
        },
        index: number
      ) => {
        const { image: channelImage } = parsedChannelData.find(
          (elem) => elem.id === item.snippet.channelId
        )!;
        if (channelImage) {
          actualData.push({
            videoId: item.id.videoId,
            videoTitle: item.snippet.title,
            videoDescription: item.snippet.description,
            videoThumbnail: item.snippet.thumbnails.medium.url,
            videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            videoDuration: parseVideoDuration(
              videosData[index]?.contentDetails?.duration
            ),
            videoViews: convertRawViewTOString(
              videosData[index]?.statistics?.viewCount
            ),
            videoAge: timeSince(new Date(item.snippet.publishedAt)),
            channelInfo: {
              id: item.snippet.channelId,
              image: channelImage,
              name: item.snippet.channelTitle,
            },
          });
        }
      }
    );
    return actualData;
  } catch (error) {
    console.log(error);
  }
};
