import { useOutletContext } from "react-router";
import Search from "./Search";
import { useEffect } from "react";

function Movies() {
  const { contents, update, setUpdate, userBookmarks, loggedIn, pageBack, width } =
    useOutletContext();
  const movies = contents.filter((show) => show.category === "Movie");

  useEffect(() => {
    pageBack();
  }, []);

  return (
    <>
      <div className="lg:pl-40">
        <Search
          array={movies}
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

export default Movies;
