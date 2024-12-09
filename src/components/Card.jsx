import { useEffect, useState } from "react";
import { deleteBookmark } from "./helpers/delete.js";
import { postData } from "./helpers/post.js";
import movieIcon from "../assets/icons/icon-nav-movies.svg"

function Card({ item, userBookmarks, setUpdate, update, loggedIn }) {
  const { thumbnail, title, year, category, rating, contentsId } = item;

  const [checked, setChecked] = useState(false);

  const setStateChecked = async () => {
    const thisBookmark = await userBookmarks.find(
      (bookmark) => bookmark.userId == loggedIn && bookmark.contentsId == contentsId
    );
    if (thisBookmark) setChecked(true);
  }

  useEffect(() => {
    setStateChecked();
  }, []);

  const toggleBookmark = () => {
    setUpdate(update + 1);
    const thisBookmark = userBookmarks.find(
      (bookmark) => bookmark.userId == loggedIn && bookmark.contentsId == contentsId
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
    <div className="shadow m-3 ">
      <div className="relative ">
        {loggedIn ? (
          <button onClick={toggleBookmark} className="text-white absolute  bookmark-icon">
            <img src={checked ? "src/assets/icons/icon-bookmark-full.svg" : "src/assets/icons/icon-bookmark-empty.svg"} alt="" />
          </button>
        ) : (
          ""
        )}

        <img className="rounded-xl bottom-5" src={"src" + thumbnail.regular.small.slice(1)} alt="#" />
      </div>

      <div className="flex mt-3 gap-2 relative">
        <p className="body-s text-white"> {year}</p>
        <p className="body-s  text-white ">.</p>
        <img className="body-s mt-0.5 w-[15px] h-[15px]" src={movieIcon} alt="SVG Image" />
        <p className="body-s text-white"> {category}</p>
        <p className="body-s text-white">.</p>
        <p className="body-s text-white"> {rating}</p>
      </div>
      <h1 className="heading-xs text-white"> {title}</h1>

    </div>
  );
}

export default Card;
