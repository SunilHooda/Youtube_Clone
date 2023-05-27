import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { HomePageVideos } from "../../types";
import { parseHomePageVideos } from "../../utils/parseHomePageVideos";

const API_KEY = process.env.REACT_APP_YOUTUBE_APP_DATA_API_KEY;

export const getSearchPageVideos = createAsyncThunk(
  "youtubeApp/searchPageVideos",
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?&q=${searchTerm}&key=${API_KEY}&maxResults=12&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );

    let parsedData: HomePageVideos[] = await parseHomePageVideos(items);
    return {
      parsedData: [...videos, ...parsedData],
      nextPageToken,
    };
  }
);
//https://youtube.googleapis.com/youtube/v3
//
