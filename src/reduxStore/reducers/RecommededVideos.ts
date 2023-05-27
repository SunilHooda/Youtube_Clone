import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { RecommendedVideos } from "../../types";
import { parseRecommendedVideos } from "../../utils/parseRecommendedVideos";

const API_KEY = process.env.REACT_APP_YOUTUBE_APP_DATA_API_KEY;

export const getRecommendedVideos = createAsyncThunk(
  "youtubeApp/getRecommendedVideos",
  async (videoId: string, { getState }) => {
    const {
      youtubeApp: {
        currentPlaying: {
          channelInfo: { id: channelId },
        },
      },
    } = getState() as RootState;

    const {
      data: { items },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`
    );

    const parsedData: RecommendedVideos[] = await parseRecommendedVideos(
      items,
      videoId
    );

    return { parsedData };
  }
);
