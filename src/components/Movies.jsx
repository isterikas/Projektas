import { useOutletContext } from "react-router";
import Search from "./Search";
import { useEffect } from "react";

function Movies() {
  const { contents, pageBack } = useOutletContext();
  const movies = contents.filter((show) => show.category === "Movie");

  useEffect(() => {
    pageBack();
  }, []);

  return (
    <>
      <Search array={movies} />
    </>
  );
}

export default Movies;
