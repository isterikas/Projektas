import { useOutletContext } from "react-router";
import Search from "./Search";
import { useEffect } from "react";

function TVShows() {
  const { contents, pageBack } = useOutletContext();

  const allTvshows = contents.filter(
    (content) => content.category === "TV Series"
  );

  useEffect(() => {
    pageBack();
  }, []);

  return (
    <>
      <Search array={allTvshows} />
    </>
  );
}

export default TVShows;
