import { useOutletContext } from "react-router";
import Search from "./Search";

function Movies() {
  const { contents, update, setUpdate, userBookmarks, loggedIn, width } =
    useOutletContext();
  const movies = contents.filter((show) => show.category === "Movie");


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
