import { useOutletContext } from "react-router";
import Search from "./Search";
import { useEffect } from "react";

function Bookmarks() {
  const { contents, userBookmarks, loggedIn, pageBack } = useOutletContext();

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
      <Search array={allBookmarks} />
    </>
  );
}

export default Bookmarks;
