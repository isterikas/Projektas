import { useOutletContext } from "react-router";
import Search from "./Search";

function Bookmarks() {
  const { contents, userBookmarks, loggedIn } = useOutletContext();

  const allBookmarks = contents.filter(
    (content) => {
      const isBookmarked = userBookmarks.find((bookmark) => bookmark.contentsId == content.contentsId && bookmark.userId == loggedIn);
      return isBookmarked;
    }
  );

  return (
    <>
      <Search array={allBookmarks} />
    </>
  );
}

export default Bookmarks;
