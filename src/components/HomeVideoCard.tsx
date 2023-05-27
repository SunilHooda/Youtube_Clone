import React from "react";
import { HomePageVideos } from "../types";
import { Link } from "react-router-dom";

const HomeVideoCard = ({ data }: { data: HomePageVideos }) => {
  return (
    <div className="w-86 md:w-64 h-60 flex flex-col">
      <div className="relative">
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {data.videoDuration}
        </span>

        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            alt="Thumbnail"
            className="h-44 w-full rounded-t-lg"
          />
        </Link>
      </div>
      <div className="flex gap-2 bg-zinc-800 p-2 rounded-b-lg">
        <div className="min-w-fit">
          <button>
            <img
              src={data.channelInfo.image}
              alt="ChannelLogo"
              className="w-9 h-9 rounded-full"
            />
          </button>
        </div>

        <div>
          <h3 className="line-clamp-2">{data.videoTitle}</h3>
          <div className="text-sm text-gray-400">
            <div>
              <button className="hover:text-white">
                {data.channelInfo.name}
              </button>
            </div>
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

export default HomeVideoCard;
