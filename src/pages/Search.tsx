import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../reduxStore/hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomePageVideos } from "../types";
import { clearVideos } from "../reduxStore/store";
import { useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../reduxStore/reducers/SearchPageVideos";
import SearchCard from "../components/SearchVideoCard";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);
  //console.log(videos, searchTerm);

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === "") navigate("/");
    else {
      dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, searchTerm]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div>
        <Navbar />
      </div>
      <div
        className="flex flex-col md:flex-row"
        style={{ height: "92.5vh", marginTop: "12px" }}
      >
        <Sidebar />
        {videos.length > 0 ? (
          <div className="py-8 pl-2 pb-4 md:pl-8 flex flex-col gap w-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getSearchPageVideos(true))}
              hasMore={videos.length < 500}
              loader={<Spinner />}
              height={600}
            >
              {videos.map((elem: HomePageVideos, index: number) => {
                return (
                  <div className="my-5 mb-4 px-2">
                    <SearchCard data={elem} key={`${elem.videoId}${index}`} />
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Search;
