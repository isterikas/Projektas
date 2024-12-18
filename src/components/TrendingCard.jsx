import { useEffect, useState } from "react";
import { deleteBookmark } from "./helpers/delete.js";
import { postData } from "./helpers/post.js";
import movieIcon from "../assets/icons/icon-nav-movies.svg";
import BookmarkFull from "./card-contents-icons/icon-bookmark-full.jsx";
import BookmarkEmpty from "./card-contents-icons/icon-bookmark-empty.jsx";
function TrendingCard({ slide, userBookmarks, loggedIn }) {
  const { contentsId, title, year, category, rating } = slide;

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
    <div>
      <div className=" absolute bottom-4 left-4 md:bottom-8 md:left-6 lg:bottom-8 lg:left-6">
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
      <div className="absolute top-2 right-2 md:top-4 md:right-7 lg:top-4 lg:right-4">
        {loggedIn ? (
          <div className="text-white absolute   bookmark-icon ">
            <div className="relative ">
              {thisBookmark ? (
                <button
                  onClick={async (e) => await unsetBookmark()}
                  className="icon-bg  bg-slate-500 bg-opacity-50  w-8 h-8  group   hover:bg-white  rounded-full group "
                >
                  <BookmarkFull />
                </button>
              ) : (
                <button
                  onClick={async (e) => await setBookmark()}
                  className="icon-bg  bg-slate-500 bg-opacity-50 w-8 h-8  group  hover:bg-white  rounded-full  "
                >
                  <BookmarkEmpty />
                </button>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TrendingCard;
