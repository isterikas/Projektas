import { useOutletContext } from "react-router";
import Search from "./Search";

function TVShows() {
  const { contents } = useOutletContext();

  const allTvshows = contents.filter(
    (content) => content.category === "TV Series"
  );

  return (
    <>
      <Search array={allTvshows} />
    </>
  );
}

export default TVShows;
