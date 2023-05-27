import React from "react";
import { RecommendedVideos } from "../types";
import { Link } from "react-router-dom";

const WatchCard = ({ data }: { data: RecommendedVideos }) => {
  return (
    <div className=" w-full flex flex-col md:flex-row gap-3 bg-zinc-800 p-3 rounded-lg">
      <div className="relative min-w-fit">
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            className="w-full h-30 md:w-42 md:h-24 rounded"
            alt="thumbnail"
          />
        </Link>
      </div>
      <div className="flex gap-1 flex-col">
        <h4 className="text-sm line-clamp-2">{data.videoTitle}</h4>
        <div className="text-xs text-grap-400">
          <div>
            <h4 className="hover:text-white">{data.channelInfo.name}</h4>
          </div>
          <div>
            <div>
              <span className="after:content-['•'] after:mx-1">
                {data.videoViews} views
              </span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchCard;
