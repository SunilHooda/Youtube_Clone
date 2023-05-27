import React from "react";
import {
  MdHomeFilled,
  MdOutlineSlowMotionVideo,
  MdSubscriptions,
  MdOutlineVideoLibrary,
  MdHistory,
  MdOutlineSmartDisplay,
  MdOutlineWatchLater,
  MdThumbUpOffAlt,
  MdSettings,
  MdOutlinedFlag,
  MdOutlineHelpOutline,
  MdOutlineFeedback,
  MdOutlineSportsVolleyball,
} from "react-icons/md";
import { TbMusic, TbDeviceGamepad2 } from "react-icons/tb";
import { GiFilmStrip } from "react-icons/gi";
import { BsFire } from "react-icons/bs";
import { IoNewspaperSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../reduxStore/hooks";
import { changeSearchTerm, clearVideos } from "../reduxStore/store";
import { getSearchPageVideos } from "../reduxStore/reducers/SearchPageVideos";

const Sidebar = () => {
  const mainLinks = [
    {
      icon: <MdHomeFilled className="text-xl" />,
      name: "Home",
    },

    {
      icon: <MdOutlineSlowMotionVideo className="text-xl" />,
      name: "Shorts",
    },
    {
      icon: <MdSubscriptions className="text-xl" />,
      name: "Subscriptions",
    },
  ];

  const secondaryLinks = [
    {
      icon: <MdOutlineVideoLibrary className="text-xl" />,
      name: "Library",
    },
    {
      icon: <MdHistory className="text-xl" />,
      name: "History",
    },
    {
      icon: <MdOutlineSmartDisplay className="text-xl" />,
      name: "Your Videos",
    },
    {
      icon: <MdOutlineWatchLater className="text-xl" />,
      name: "Watch Later",
    },
    {
      icon: <MdThumbUpOffAlt className="text-xl" />,
      name: "Liked Videos",
    },
  ];

  const exploreLinks = [
    {
      icon: <BsFire className="text-xl" />,
      name: "Trending",
    },
    {
      icon: <TbMusic className="text-xl" />,
      name: "Music",
    },
    {
      icon: <MdOutlineSportsVolleyball className="text-xl" />,
      name: "Sport",
    },
    {
      icon: <TbDeviceGamepad2 className="text-xl" />,
      name: "Gaming",
    },
    {
      icon: <GiFilmStrip className="text-xl" />,
      name: "Movies",
    },
    {
      icon: <IoNewspaperSharp className="text-xl" />,
      name: "News",
    },
  ];

  const helpLinks = [
    {
      icon: <MdSettings className="text-xl" />,
      name: "Settings",
    },
    {
      icon: <MdOutlinedFlag className="text-xl" />,
      name: "Report history",
    },
    {
      icon: <MdOutlineHelpOutline className="text-xl" />,
      name: "Help",
    },
    {
      icon: <MdOutlineFeedback className="text-xl" />,
      name: "Send feedback",
    },
  ];

  const textLinks = [
    [
      "About",
      "Press",
      "Copyright",
      "Contact us",
      "Creator",
      "Advertise",
      "Developers",
    ],
    [
      "Terms",
      "Privacy",
      "Policy & Safety",
      "How YouTube works",
      "Test new features",
    ],
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    if (location.pathname !== "/search") navigate("/search");
    else {
      dispatch(clearVideos());
      dispatch(getSearchPageVideos(false));
    }
  };

  return (
    <div className="w-full h-12 md:h-full flex md:flex-col md:w-3/12 lg:w-2/12 bg-[#212121] pr-5 overflow-auto pb-1 md:pb-8">
      <ul className="hidden md:flex md:flex-col border-r-2 md:border-b-2 md:border-r-0 border-gray-700">
        {mainLinks.map(({ icon, name }) => {
          return (
            <li
              className={` px-4 md:pl-6 md:px-0 py-3 hover:bg-zinc-600 ${
                name === "Home" ? "bg-slate-600" : ""
              }`}
              key={name}
            >
              <button className="flex items-center gap-3 lg:gap-5">
                {icon} <span className="text-sm tracking-wider">{name}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="hidden md:flex md:flex-col border-b-2 border-gray-700">
        {secondaryLinks.map(({ icon, name }) => {
          return (
            <li
              className={` px-4 md:pl-6 md:px-0 py-3 hover:bg-zinc-600 `}
              key={name}
            >
              <button className="flex items-center gap-3 lg:gap-5">
                {icon}{" "}
                <span className="text-sm tracking-wider text-left ">
                  {name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="flex md:flex md:flex-col border-r-2 md:border-b-2 md:border-r-0 border-gray-700">
        <h2 className={`px-4 md:pl-6 md:px-0 pt-3 pd-2`}>Explore</h2>
        {exploreLinks.map(({ icon, name }) => {
          return (
            <li
              className={` px-4 md:pl-6 md:px-0 py-3 hover:bg-zinc-600 `}
              key={name}
            >
              <button
                onClick={() => {
                  dispatch(changeSearchTerm(name));
                  handleSearch();
                }}
                className="flex items-center gap-3 lg:gap-5"
              >
                {icon} <span className="text-sm tracking-wider">{name}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="hidden md:flex md:flex-col border-b-2 border-gray-700">
        {helpLinks.map(({ icon, name }) => {
          return (
            <li
              className={` px-4 md:pl-6 md:px-0 py-3 hover:bg-zinc-600 `}
              key={name}
            >
              <button className="flex items-center gap-3 lg:gap-5 ">
                {icon}{" "}
                <span className="text-sm tracking-wider text-left">{name}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="hidden md:flex md:flex-col gap-2 flex-wrap text-sm p-4 text-zinc-400">
        {textLinks[1].map((name) => {
          return <li key={name}>{name}</li>;
        })}
      </ul>
      <span className="px-4 text-sm text-zinc-400">
        &copy; 2023 Sunil_Hooda
      </span>
    </div>
  );
};

export default Sidebar;
