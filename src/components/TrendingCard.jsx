import { useEffect, useState } from "react";
import { deleteBookmark } from "./helpers/delete.js";
import { postData } from "./helpers/post.js";
import { getAllData } from "./helpers/get.js";
import movieIcon from "../assets/icons/icon-nav-movies.svg";
import BookmarkFull from "./card-contents-icons/icon-bookmark-full.jsx";
import BookmarkEmpty from "./card-contents-icons/icon-bookmark-empty.jsx";
function TrendingCard({ slide, setUpdate, update, loggedIn }) {
  const { contentsId, title, year, category, rating } = slide;
  const [checked, setChecked] = useState(false);

  const [userBookmarks, setUserBookmarks] = useState([]);

  const getAllUserBookmarks = async () => {
    const userBookmarks = await getAllData("userBookmarks");
    setUserBookmarks(userBookmarks);
  };

  const getThisBookmark = () => {
    const thisBookmark = userBookmarks.find(
      (bookmark) =>
        bookmark.userId == loggedIn && bookmark.contentsId == contentsId
    );
    if (thisBookmark) setChecked(true);
  };

  useEffect(() => {
    getAllUserBookmarks();
    getThisBookmark();
  }, []);

  const toggleBookmark = async () => {
    const bookmarks = await getAllData("userBookmarks");
    setUserBookmarks(bookmarks);
    const thisBookmark = userBookmarks.find(
      (bookmark) =>
        bookmark.userId == loggedIn && bookmark.contentsId == contentsId
    );
    if (thisBookmark) {
      await deleteBookmark(thisBookmark.id);
      setChecked(false);
    } else {
      setChecked(true);
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
        <div className="flex mt-3 gap-2 relative body-s text-white">
          <p> {year}</p>
          <img
            className=""
            src="src/assets/icons/icon-dot.svg"
            alt="SVG Image"
          />
          <img
            className=" mt-0.5 w-[15px] h-[15px]"
            src={movieIcon}
            alt="SVG Image"
          />
          <p> {category}</p>
          <img
            className=""
            src="src/assets/icons/icon-dot.svg"
            alt="SVG Image"
          />
          <p> {rating}</p>
        </div>
        <h2 className="heading-xs text-white"> {title}</h2>
      </div>
      <div className="absolute top-2 right-2 md:top-4 md:right-7 lg:top-4 lg:right-4">
        {loggedIn ? (
          <button
            onClick={async (e) => await toggleBookmark()}
            className="text-white absolute   bookmark-icon "
          >
            <div className="relative icon-bg  bg-slate-500 bg-opacity-50  w-8 h-8  group   hover:bg-white  rounded-full">
              {checked ? (
                <div className=" group ">
                  <BookmarkFull />
                </div>
              ) : (
                <div>
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
