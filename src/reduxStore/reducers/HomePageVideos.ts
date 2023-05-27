import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { HomePageVideos } from "../../types";
import { parseHomePageVideos } from "../../utils/parseHomePageVideos";

const API_KEY = process.env.REACT_APP_YOUTUBE_APP_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
  "youtubeApp/homePageVideos",
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?&q="MernStack"&key=${API_KEY}&part=snippet&maxResults=20&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );
    console.log(items, nextPageToken);
    let parsedData: HomePageVideos[] = await parseHomePageVideos(items);
    return {
      parsedData: [...videos, ...parsedData],
      nextPageToken,
    };
  }
);
//https://youtube.googleapis.com/youtube/v3
//
