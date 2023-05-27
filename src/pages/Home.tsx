import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../reduxStore/hooks";
import { getHomePageVideos } from "../reduxStore/reducers/HomePageVideos";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomePageVideos } from "../types";
import HomeVideoCard from "../components/HomeVideoCard";
import { clearVideos } from "../reduxStore/store";
import BottomNavbar from "../components/BottomNavbar";

const Home = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  //console.log(videos);

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearVideos());
  //   };
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getHomePageVideos(false));

    return () => {
      dispatch(clearVideos());
    };
  }, [dispatch]);

  return (
    <div className="relative max-h-screen overflow-hidden">
      <div>
        <Navbar />
      </div>
      <div
        className="flex flex-col md:flex-row"
        style={{ height: "92.5vh", marginTop: "12px" }}
      >
        <Sidebar />
        {videos.length > 0 ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={650}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-12 p-8 p-b-4">
              {videos.map((elem: HomePageVideos, index: number) => {
                return (
                  <HomeVideoCard data={elem} key={`${elem.videoId}${index}`} />
                );
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>

      <BottomNavbar />
    </div>
  );
};

export default Home;
