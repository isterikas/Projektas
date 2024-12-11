import { useOutletContext } from "react-router";
import Search from "./Search";
import { useEffect } from "react";

function TVShows() {
  const { contents, update, setUpdate, userBookmarks, loggedIn, pageBack, width } =
    useOutletContext();

  const allTvshows = contents.filter(
    (content) => content.category === "TV Series"
  );

  useEffect(() => {
    pageBack();
  }, []);

  return (
    <>
      <div className="lg:pl-40">
        <Search
          array={allTvshows}
          update={update}
          setUpdate={setUpdate}
          userBookmarks={userBookmarks}
          loggedIn={loggedIn}
          width={width}
        />
      </div>
    </>
  );
}

export default TVShows;
