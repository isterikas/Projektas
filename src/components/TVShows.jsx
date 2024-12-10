import { useOutletContext } from "react-router";
import Search from "./Search";
import { useEffect } from "react";

function TVShows() {
  const { contents, update, setUpdate, userBookmarks, loggedIn, pageBack } =
    useOutletContext();

  const allTvshows = contents.filter(
    (content) => content.category === "TV Series"
  );

  useEffect(() => {
    pageBack();
  }, []);

  return (
    <>
      <Search
        array={allTvshows}
        update={update}
        setUpdate={setUpdate}
        userBookmarks={userBookmarks}
        loggedIn={loggedIn}
      />
    </>
  );
}

export default TVShows;
