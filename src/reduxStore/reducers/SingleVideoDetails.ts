import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { convertRawViewTOString } from "../../utils/convertRawViewTOString";
import { timeSince } from "../../utils/timeSince";

const API_KEY = process.env.REACT_APP_YOUTUBE_APP_DATA_API_KEY;

export const getSingleVideoDetails = createAsyncThunk(
  "youtubeApp/videoDetails",
  async (id: string) => {
    const {
      data: { items },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?&key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`
    );

    console.log(items);

    return actualData(items[0]);
  }
);

const actualData = async (item: {
  snippet: {
    channelId: string;
    title: string;
    description: string;
    publishedAt: string;
    channelTitle: string;
  };
  id: string;
  statistics: { viewCount: string; likeCount: string };
}) => {
  const {
    data: {
      items: [
        {
          snippet: {
            thumbnails: {
              default: { url: channelImage },
            },
          },
          statistics: { subscriberCount },
        },
      ],
    },
  } = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`
  );

  return {
    videoId: item?.id,
    videoTitle: item?.snippet?.title,
    videoDescription: item?.snippet?.description,
    videoViews: Number(item?.statistics?.viewCount).toLocaleString(),
    videoLikes: convertRawViewTOString(item?.statistics?.likeCount),
    videoAge: timeSince(new Date(item.snippet.publishedAt)),
    channelInfo: {
      id: item?.snippet?.channelId,
      image: channelImage,
      name: item?.snippet?.channelTitle,
      subscribers: convertRawViewTOString(subscriberCount, true),
    },
  };
};
