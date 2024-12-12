import { useEffect, useState } from "react";
import { deleteBookmark } from "./helpers/delete.js";
import { postData } from "./helpers/post.js";
import movieIcon from "../assets/icons/icon-nav-movies.svg";
import PlayIcon from "../assets/icons/icon-play.svg";

function Card({ item, userBookmarks, setUpdate, update, loggedIn, width }) {
  const { thumbnail, title, year, category, rating, contentsId } = item;

  const [checked, setChecked] = useState(false);

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
      
        <div className="z-50 absolute top-1 right-1 md:top-5 md:right-5 lg:top-3 lg:right-4 ">
          {loggedIn ? (
            <button onClick={toggleBookmark} className="bookmark-icon">
              <img
                src={
                  checked
                    ? "src/assets/icons/icon-circle-bookmark-full.svg"
                    : "src/assets/icons/icon-circle-bookmark-empty.svg"
                }
                alt=""
              />
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="relative">
          <div>
            {{ width } < 1024 ? (
              <img
                className="rounded-xl bottom-5"
                src={"src" + thumbnail.regular.small.slice(1)}
                alt="#"
              />
            ) : {width} < 768 ? (
              <img
                className="rounded-xl bottom-5"
                src={"src" + thumbnail.regular.medium.slice(1)}
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
            <p className="flex justify-center">
              <div className="rounded-[100px] bg-white bg-opacity-25 flex gap-[19px] p-3">
                <img src={PlayIcon} alt="#" />
                <p>Play</p>
              </div>
            </p>
          </div>
        </div>

        <div className="relative">
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
  );
}

export default Card;
