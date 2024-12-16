import { useEffect, useState } from "react";
import { deleteBookmark } from "./helpers/delete.js";
import { postData } from "./helpers/post.js";
import movieIcon from "../assets/icons/icon-nav-movies.svg";
import BookmarkFull from "./card-contents-icons/icon-bookmark-full.jsx";
import BookmarkEmpty from "./card-contents-icons/icon-bookmark-empty.jsx";
function TrendingCard({ slide, userBookmarks, setUpdate, update, loggedIn }) {
  const { contentsId, title, year, category, rating } = slide;
  const [checked, setChecked] = useState(false);

  const setStateChecked = () => {
    const thisBookmark = userBookmarks.find(
      (bookmark) =>
        bookmark.userId == loggedIn && bookmark.contentsId == contentsId
    );
    if (thisBookmark) setChecked(true);
    else setChecked(false);
  };

  useEffect(() => {
    setStateChecked();
  }, [update]);

  const toggleBookmark = async () => {
    setUpdate(update + 1);
    const thisBookmark = userBookmarks.find(
      (bookmark) =>
        bookmark.userId == loggedIn && bookmark.contentsId == contentsId
    );
    if (thisBookmark) {
      await deleteBookmark(thisBookmark.id);
      setChecked(!checked);
    } else {
      setChecked(!checked);
      await postData(
        { contentsId: contentsId, userId: loggedIn },
        "userBookmarks"
      );
    }
    setUpdate(update + 1);
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
          <button
            onClick={async (e) => await toggleBookmark()}
            className="text-white absolute   bookmark-icon "
          >
            <div className="relative ">
              {checked ? (
                <div className="icon-bg  bg-slate-500 bg-opacity-50  w-8 h-8  group   hover:bg-white  rounded-full group ">
                  <BookmarkFull />
                </div>
              ) : (
                <div className="icon-bg  bg-slate-500 bg-opacity-50 w-8 h-8  group  hover:bg-white  rounded-full  ">
                  {" "}
                  <BookmarkEmpty />
                </div>
              )}
            </div>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TrendingCard;
