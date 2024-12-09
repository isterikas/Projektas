import { useOutletContext } from "react-router";
import Search from "./Search";

function Movies() {
  const { contents, update, setUpdate, userBookmarks, loggedIn } = useOutletContext();
  const movies = contents.filter((show) => show.category === "Movie");

  return (
    <>
      <Search array={movies} update={update} setUpdate={setUpdate} userBookmarks={userBookmarks} loggedIn={loggedIn} />
    </>
  );
}

export default Movies;
