import { useEffect, useState } from "react";
import { deleteBookmark } from "./helpers/delete.js";
import { postData } from "./helpers/post.js";
import movieIcon from "../assets/icons/icon-nav-movies.svg";
import PlayIcon from "../assets/icons/icon-play.svg";
import BookmarkFull from "./card-contents-icons/icon-bookmark-full.jsx";
import BookmarkEmpty from "./card-contents-icons/icon-bookmark-empty.jsx";
function Card({ item, userBookmarks, loggedIn, width }) {
  const { thumbnail, title, year, category, rating, contentsId } = item;

  const [thisBookmark, setThisBookmark] = useState({});

  const getThisBookmark = () => {
    const foundBookmark = userBookmarks.find(
      (bookmark) =>
        bookmark.userId == loggedIn && bookmark.contentsId == contentsId
    );
    setThisBookmark(foundBookmark);
  };

  useEffect(() => {
    getThisBookmark();
  }, [userBookmarks]);

  const setBookmark = async () => {
    await postData(
      { contentsId: contentsId, userId: loggedIn },
      "userBookmarks"
    );
  };

  const unsetBookmark = async () => {
    await deleteBookmark(thisBookmark.id);
  };

  return (
    <div className="shadow m-3 relative">
      <div className=" ">
        {loggedIn ? (
          <div className="text-white absolute bookmark-icon ">
            <div className="relative top-1/10 right-1/10">
              {thisBookmark ? (
                <button
                  onClick={async (e) => await unsetBookmark()}
                  className="icon-bg bg-slate-500 bg-opacity-50 w-8 h-8 hover:bg-white rounded-full group"
                >
                  <BookmarkFull />
                </button>
              ) : (
                <button
                  onClick={async (e) => await setBookmark()}
                  className="icon-bg bg-slate-500 bg-opacity-50 w-8 h-8 hover:bg-white rounded-full group"
                >
                  <BookmarkEmpty />
                </button>
              )}
            </div>
          </div>
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
            className="absolute rounded-xl inset-0 hover:bg-black hover:bg-opacity-50 hover:cursor-pointer opacity-0 hover:opacity-100 text-white place-content-center heading-xs
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
          <h2 className="heading-xs text-white"> {title}</h2>
        </div>
      </div>
    </div>
  );
}

export default Card;
