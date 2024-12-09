import { useOutletContext } from "react-router";
import Search from "./Search";
import { useEffect } from "react";

function Bookmarks() {
  const { contents, pageBack } = useOutletContext();

  const allBookmarks = contents.filter(
    (content) => content.isBookmarked === true
  );

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
