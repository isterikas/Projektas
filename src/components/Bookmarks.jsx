import { useOutletContext } from "react-router";
import Search from "./Search";

function Bookmarks() {
  const { contents, userBookmarks, loggedIn, update, setUpdate, width } = useOutletContext();

  const allBookmarks = contents.filter((content) => {
    const isBookmarked = userBookmarks.find(
      (bookmark) =>
        bookmark.contentsId == content.contentsId && bookmark.userId == loggedIn
    );
    return isBookmarked;
  });

  return (
    <>
      <div className="lg:pl-40">
        <Search array={allBookmarks} update={update} setUpdate={setUpdate} userBookmarks={userBookmarks} loggedIn={loggedIn} width={width}/>
      </div>
    </>
  );
}

export default Bookmarks;
