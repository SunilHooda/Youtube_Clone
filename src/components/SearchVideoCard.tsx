import React from "react";
import { HomePageVideos } from "../types";
import { Link } from "react-router-dom";

const SearchCard = ({ data }: { data: HomePageVideos }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 bg-zinc-800 p-3 rounded-lg lg:mr-10 ">
      <div className="relative  ">
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            className="h-52 w-96 rounded "
            alt="thumbnail"
          />
        </Link>
      </div>
      <div className="flex gap-1 flex-col">
        <h3 className="max-w-2xl line-clamp-2">{data.videoTitle}</h3>
        <div className="text-xs text-grap-400">
          <div>
            <div>
              <span className="after:content-['•'] after:mx-1">
                {data.videoViews} views
              </span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
        <div className="min-w-fit my-2">
          <button className="flex items-center gap-2 text-xs text-gray-400">
            <img
              src={data.channelInfo.image}
              alt="channel"
              className="h-9 w-9 rounded-full"
            />
            <span>{data.channelInfo.name}</span>
          </button>
        </div>
        <div className="max-w-2xl line-clamp-2 text-sm text-gray-400">
          <p>{data.videoDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
