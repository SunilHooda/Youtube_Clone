import React from "react";
import { BsYoutube } from "react-icons/bs";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { FaMicrophone, FaRegBell } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../reduxStore/hooks";
import {
  changeSearchTerm,
  clearSearchTerm,
  clearVideos,
} from "../reduxStore/store";
import { getSearchPageVideos } from "../reduxStore/reducers/SearchPageVideos";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  const handleSearch = () => {
    if (location.pathname !== "/search") navigate("/search");
    else {
      dispatch(clearVideos());
      dispatch(getSearchPageVideos(false));
    }
  };
  return (
    <>
      <div className="flex justify-between items-center px-6 gap-4 h-16 bg-[#212121] sticky top-0 z-10 opacity-95 ">
        <div className="flex items-center text-2xl gap-8 ">
          <Link to={"/"}>
            <div className="flex gap-1 justify-center items-center">
              <BsYoutube className="text-3xl text-red-600" />
              <span className="text-xl font-medium">YouTube</span>
            </div>
          </Link>
        </div>

        <div className=" hidden md:flex lg:flex no-wrap justify-center items-center gap-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className="flex items-center h-10">
              <div className="flex gap-1 items-center">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
                  className="md:w-80 lg:w-96 h-10 text-lg pl-4 bg-zinc-800 border border-zinc-700 rounded-l-full focus:outline outline-blue-500 focus:border-none"
                />
                <AiOutlineClose
                  className={`text-xl cursor-pointer white ${
                    !searchTerm ? "invisible" : "visible"
                  } ${!searchTerm ? "w-0" : "w-6"} `}
                  onClick={() => dispatch(clearSearchTerm())}
                />
              </div>
              <button className="w-16 h-10 flex justify-center items-center bg-zinc-700">
                <AiOutlineSearch className="text-2xl" />
              </button>
            </div>
          </form>
          <div className="text-xl p-3 bg-zinc-700 rounded-full">
            <FaMicrophone />
          </div>
        </div>

        <div className="flex gap-5 items-center text-xl">
          <RiVideoAddLine />

          <div className="relative">
            <FaRegBell />
            <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
              9+
            </span>
          </div>
          <a href="https://github.com/SunilHooda">
            <img
              src="https://avatars.githubusercontent.com/u/105985748?v=4"
              alt="userPic"
              className="w-9 h-9 rounded-full"
            />
          </a>
        </div>
      </div>

      <div className="flex md:hidden lg:hidden justify-center items-center gap-5 mt-3 ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex items-center h-10">
            <div className="flex gap-1 items-center">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
                className="w-76 h-10 text-lg pl-4 bg-zinc-800 border border-zinc-700 rounded-l-full focus:outline outline-blue-500 focus:border-none"
              />
              <AiOutlineClose
                className={`text-xl cursor-pointer white ${
                  !searchTerm ? "invisible" : "visible"
                } ${!searchTerm ? "w-0" : "w-6"} `}
                onClick={() => dispatch(clearSearchTerm())}
              />
            </div>
            <button className="w-16 h-10 flex justify-center items-center bg-zinc-700">
              <AiOutlineSearch className="text-2xl" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Navbar;
