import { useOutletContext } from "react-router";
import Search from "./Search";
import { useEffect } from "react";

function Movies() {
  const { contents, update, setUpdate, userBookmarks, loggedIn, pageBack } =
    useOutletContext();
  const movies = contents.filter((show) => show.category === "Movie");

  useEffect(() => {
    pageBack();
  }, []);

  return (
    <>
      <Search
        array={movies}
        update={update}
        setUpdate={setUpdate}
        userBookmarks={userBookmarks}
        loggedIn={loggedIn}
      />
    </>
  );
}

export default Movies;
