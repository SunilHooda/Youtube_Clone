import axios from "axios";
import { Item, RecommendedVideos } from "../types";
import { parseVideoDuration } from "./parseVideoDuration";
import { convertRawViewTOString } from "./convertRawViewTOString";
import { timeSince } from "./timeSince";

const API_KEY = process.env.REACT_APP_YOUTUBE_APP_DATA_API_KEY;

export const parseRecommendedVideos = async (
  items: Item[],
  videoId: string
) => {
  try {
    const videoIds: string[] = [];
    const channelIds: string[] = [];
    const newItems: Item[] = [];

    items.forEach((item: Item) => {
      channelIds.push(item?.snippet?.channelId);

      if (item?.contentDetails?.upload?.videoId) {
        videoIds.push(item.contentDetails.upload.videoId);
        newItems.push(item);
      }
    });

    const {
      data: { items: videosData },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );
    //console.log(videosData);

    const actualData: RecommendedVideos[] = [];
    newItems.forEach((elem, index) => {
      if (index >= videosData.length) return;

      if (videoId === elem?.contentDetails?.upload?.videoId) return;

      actualData.push({
        videoId: elem.contentDetails.upload.videoId,
        videoTitle: elem.snippet.title,
        videoThumbnail: elem.snippet.thumbnails.medium.url,
        videoDuration: parseVideoDuration(
          videosData[index]?.contentDetails?.duration
        ),
        videoViews: convertRawViewTOString(
          videosData[index]?.statistics?.viewCount
        ),
        videoAge: timeSince(new Date(elem?.snippet?.publishedAt)),
        channelInfo: {
          id: elem?.snippet?.channelId,
          name: elem?.snippet.channelTitle,
        },
      });
    });
    return actualData;
  } catch (error) {
    console.log(error);
  }
};
