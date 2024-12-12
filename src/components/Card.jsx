import { useEffect, useState } from "react";
import { deleteBookmark } from "./helpers/delete.js";
import { postData } from "./helpers/post.js";
import movieIcon from "../assets/icons/icon-nav-movies.svg";
import PlayIcon from "../assets/icons/icon-play.svg";
import BookmarkFull from "./card-contents-icons/icon-bookmark-full.jsx";
import BookmarkEmpty from "./card-contents-icons/icon-bookmark-empty.jsx";

function Card({ item, userBookmarks, setUpdate, update, loggedIn, width }) {
  const { thumbnail, title, year, category, rating, contentsId } = item;

  const [checked, setChecked] = useState(false);
  const [hover, hovered] = useState();

  const setStateChecked = async () => {
    const thisBookmark = await userBookmarks.find(
      (bookmark) =>
        bookmark.userId == loggedIn && bookmark.contentsId == contentsId
    );
    if (thisBookmark) setChecked(true);
  };

  useEffect(() => {
    setStateChecked(true);
  }, [update]);

  const toggleBookmark = () => {
    setUpdate(update + 1);
    const thisBookmark = userBookmarks.find(
      (bookmark) =>
        bookmark.userId == loggedIn && bookmark.contentsId == contentsId
    );
    if (thisBookmark) {
      deleteBookmark(thisBookmark.id);
      setChecked(false);
    } else {
      setChecked(true);
      postData({ contentsId: contentsId, userId: loggedIn }, "userBookmarks");
    }
  };

  return (
    <div className="shadow m-3 relative">
      <div className=" ">
        {loggedIn ? (
          <button
            onClick={toggleBookmark}
            className="text-white absolute bookmark-icon "
          >
            <div className="relative ">
              {checked ? (
                <div className="icon-bg  bg-slate-500 w-8 h-8  group   hover:bg-white  rounded-full group ">
                  <BookmarkFull />
                </div>
              ) : (
                <div className="icon-bg  bg-slate-500 w-8 h-8  group  hover:bg-white  rounded-full  ">
                  {" "}
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
            {{ width } < 1024 ? (
              <img
                className="rounded-xl bottom-5"
                src={"src" + thumbnail.regular.small.slice(1)}
                alt="#"
              />
            ) : (
              <img
                className="rounded-xl bottom-5"
                src={"src" + thumbnail.regular.large.slice(1)}
                alt="#"
              />
            )}
          </div>

          <div
            className="absolute inset-0 hover:bg-black hover:bg-opacity-50 hover:cursor-pointer opacity-0 hover:opacity-100 text-white place-content-center heading-xs
                "
          >
            <div className="flex justify-center">
              <div className="rounded-[100px] bg-white bg-opacity-25 flex gap-[19px] p-3">
                <img src={PlayIcon} alt="#" />
                <p>Play</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex mt-3 gap-2 relative ">
            <p className="body-s text-white"> {year}</p>
            <img
              className="body-s"
              src="src/assets/icons/icon-dot.svg"
              alt="SVG Image"
            />
            <img
              className="body-s mt-0.5 w-[15px] h-[15px]"
              src={movieIcon}
              alt="SVG Image"
            />
            <p className="body-s text-white"> {category}</p>
            <img
              className="body-s"
              src="src/assets/icons/icon-dot.svg"
              alt="SVG Image"
            />
            <p className="body-s text-white"> {rating}</p>
          </div>
          <h1 className="heading-xs text-white"> {title}</h1>
        </div>
      </div>
    </div>
  );
}

export default Card;
