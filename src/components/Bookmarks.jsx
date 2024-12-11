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
      <Search array={allBookmarks} update={update} setUpdate={setUpdate} userBookmarks={userBookmarks} loggedIn={loggedIn} width={width}/>
    </>
  );
}

export default Bookmarks;
