import { useOutletContext } from "react-router";
import Search from "./Search";

function Movies() {
  const { contents } = useOutletContext();
  const movies = contents.filter((show) => show.category === "Movie");

  return (
    <>
      <Search array={movies} />
    </>
  );
}

export default Movies;
