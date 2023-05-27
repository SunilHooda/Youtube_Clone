import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../reduxStore/hooks";
import { getSingleVideoDetails } from "../reduxStore/reducers/SingleVideoDetails";
import { getRecommendedVideos } from "../reduxStore/reducers/RecommededVideos";
import Navbar from "../components/Navbar";

import { BiLike, BiDislike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import WatchCard from "../components/WatchCard";

const Watch = () => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentPlaying = useAppSelector(
    (state) => state.youtubeApp.currentPlaying
  );

  const recommendedVideos = useAppSelector(
    (state) => state.youtubeApp.recommendedVideos
  );

  useEffect(() => {
    if (id) {
      dispatch(getSingleVideoDetails(id));
      setShowMore(false);
    } else {
      navigate("/");
    }
  }, [id, dispatch, navigate]);

  useEffect(() => {
    if (currentPlaying && id) dispatch(getRecommendedVideos(id));
  }, [currentPlaying, id, dispatch]);

  return (
    <>
      {currentPlaying && currentPlaying?.videoId === id && (
        <div className="max-h-screen overflow-hidden">
          <div>
            <Navbar />
          </div>
          <div
            className="w-full flex flex-col md:flex-row"
            style={{ height: "89.5vh", marginTop: "12px" }}
          >
            <div className=" w-full flex flex-col lg:flex-row gap-y-10 gap-x-5 p-3 md:p-7 lg:mx-20 mr-0 overflow-auto">
              <div className="w-full lg:w-2/3 flex flex-col">
                <div className="w-full aspect-w-16 aspect-h-9 ">
                  <iframe
                    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                    frameBorder="0"
                    title="Youtube Video Player"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
                <div className="mt-5">
                  <p className="text-lg md:text-xl">
                    {currentPlaying.videoTitle}
                  </p>
                  <div className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between mt-1">
                    <div className="text-md text-gray-400">
                      <span className="after:content-['•'] after:mx-1">
                        {currentPlaying.videoViews} views
                      </span>
                      <span> {currentPlaying.videoAge} ago</span>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 uppercase">
                      <div className="flex items-center gap-1 cursor-pointer">
                        <BiLike className="text-md md:text-lg" />
                        <h3>{currentPlaying.videoLikes} likes</h3>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <BiDislike className="text-md md:text-lg" />
                        <h3>dislike</h3>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <RiShareForwardLine className="text-md md:text-lg" />
                        <h3>share</h3>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <BsThreeDots className="text-md md:text-lg" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 border-solid border-gray-400 border-2 my-5 pb-5 mb-5 border-l-transparent border-r-transparent">
                    <div className="flex items-center gap-5 mr-0 md:mr-5 mt-4">
                      <div className="md:h-12 md:w-12">
                        <img
                          src={currentPlaying.channelInfo.image}
                          alt=""
                          className="rounded-full h-full w-full "
                        />
                      </div>
                      <div className="w-5/6">
                        <h5 className="text-sm">
                          <h3>{currentPlaying.channelInfo.name}</h3>
                        </h5>
                        <h6 className="text-gray-400 text-xs">
                          {currentPlaying.channelInfo.subscribers} subscribers
                        </h6>
                      </div>
                      <div>
                        <button className="uppercase bg-red-600 rounded-sm p-2 text-sm">
                          subscribe
                        </button>
                      </div>
                    </div>
                    <div
                      className={`${
                        !showMore ? "max-h-16 overflow-hidden" : ""
                      } text-sm w-11/12`}
                    >
                      <pre
                        style={{
                          fontFamily: `"Roboto", sans-serif`,
                        }}
                        className="whitespace-pre-wrap"
                      >
                        {currentPlaying.videoDescription}
                      </pre>
                    </div>
                    <div>
                      <button
                        className="uppercase text-sm cursor-pointer"
                        onClick={() => setShowMore(!showMore)}
                      >
                        Show {showMore ? "less" : "more"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" lg:mr-24 lg:w-1/3 flex flex-col gap-3 pb-5 ">
                {getRecommendedVideos.length &&
                  recommendedVideos.map((item) => {
                    return <WatchCard data={item} key={item.videoId} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Watch;
