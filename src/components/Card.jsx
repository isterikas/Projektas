import { useEffect, useState } from "react";
import { deleteBookmark } from "./helpers/delete.js";
import { postData } from "./helpers/post.js";
import { getAllData } from "./helpers/get.js";
import movieIcon from "../assets/icons/icon-nav-movies.svg";
import PlayIcon from "../assets/icons/icon-play.svg";
import BookmarkFull from "./card-contents-icons/icon-bookmark-full.jsx";
import BookmarkEmpty from "./card-contents-icons/icon-bookmark-empty.jsx";

function Card({ item, setUpdate, update, loggedIn, width, isBookmarked }) {
  const { thumbnail, title, year, category, rating, contentsId } = item;

  const toggleBookmark = async () => {
    if (isBookmarked) {
      await deleteBookmark(isBookmarked.id);
    } else {
      await postData(
        { contentsId: contentsId, userId: loggedIn },
        "userBookmarks"
      );
    }
    setUpdate(update + 1);
  };

  return (
    <div className="shadow m-3 relative">
      <div className=" ">
        {loggedIn ? (
          <button
            onClick={async () => await toggleBookmark()}
            className="text-white absolute bookmark-icon "
          >
            <div className="relative icon-bg  bg-slate-500 w-8 h-8  group   hover:bg-white  rounded-full">
              {isBookmarked ? (
                <div className="group ">
                  <BookmarkFull />
                </div>
              ) : (
                <div>
                  <BookmarkEmpty />
                </div>
              )}
            </div>
          </button>
        ) : (
          ""
        )}

        <div className="relative">
          <div className="">
            <img
              className="rounded-xl bottom-5"
              src={"src" + thumbnail.regular.large.slice(1)}
              alt="#"
            />
          </div>

          <div
            className="absolute inset-0 hover:bg-black hover:bg-opacity-50 hover:cursor-pointer opacity-0 hover:opacity-100 text-white place-content-center heading-xs hover:rounded-[10px]
                "
          >
            <div className="flex justify-center">
              <div className="rounded-[100px]  bg-white bg-opacity-25 flex gap-[19px] p-3">
                <img src={PlayIcon} alt="#" />
                <p>Play</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex mt-3 gap-2 relative body-s text-white">
            <p> {year}</p>
            <img src="src/assets/icons/icon-dot.svg" alt="SVG Image" />
            <img
              className=" mt-0.5 w-[15px] h-[15px]"
              src={movieIcon}
              alt="SVG Image"
            />
            <p> {category}</p>
            <img src="src/assets/icons/icon-dot.svg" alt="SVG Image" />
            <p> {rating}</p>
          </div>
          <h2 className="heading-xs text-white"> {title}</h2>
        </div>
      </div>
    </div>
  );
}

export default Card;
