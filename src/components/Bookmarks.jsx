import { useOutletContext } from "react-router";
import Search from "./Search";

function Bookmarks() {
  const { contents } = useOutletContext();

  const allBookmarks = contents.filter(
    (content) => content.isBookmarked === true
  );

  return (
    <>
      <Search array={allBookmarks} />
    </>
  );
}

export default Bookmarks;
