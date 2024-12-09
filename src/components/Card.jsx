import { deleteBookmark } from "./helpers/delete.js";
import { postData } from "./helpers/post.js";

function Card({ item, userBookmarks, setUpdate, update, loggedIn }) {
  const { thumbnail, title, year, category, rating, id } = item;

  const toggleBookmark = () => {
    setUpdate(update + 1);
    const thisBookmark = userBookmarks.find(
      (bookmark) => bookmark.userId == loggedIn && bookmark.contentsId == id
    );
    if (thisBookmark) {
      deleteBookmark(thisBookmark.id);
    } else {
      postData({ contentsId: id, userId: loggedIn }, "userBookmarks");
    }
  };

  return (
    <div className="shadow m-3">
      <div>
        <img src={"src" + thumbnail.regular.small.slice(1)} alt="#" />
      </div>
      <p className="body-s text-white"> {year}</p>
      <p className="body-s text-white"> {category}</p>
      <p className="body-s text-white"> {rating}</p>
      <h1 className="heading-xs text-white"> {title}</h1>
      {loggedIn ? (
        <button onClick={toggleBookmark} className="text-white">
          Bookmark
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Card;
