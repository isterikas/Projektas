import { useOutletContext } from "react-router";
import Search from "./Search";
import { useEffect } from "react";

function Bookmarks() {
  const { contents, userBookmarks, loggedIn, update, setUpdate, pageBack, width } = useOutletContext();

  const allBookmarks = contents.filter((content) => {
    const isBookmarked = userBookmarks.find(
      (bookmark) =>
        bookmark.contentsId == content.contentsId && bookmark.userId == loggedIn
    );
    return isBookmarked;
  });

  useEffect(() => {
    pageBack();
  }, []);

  return (
    <>
      <div className="lg:pl-40">
        <Search array={allBookmarks} update={update} setUpdate={setUpdate} userBookmarks={userBookmarks} loggedIn={loggedIn} width={width}/>
      </div>
    </>
  );
}

export default Bookmarks;
