import { useOutletContext } from "react-router";
import Search from "./Search";

function TVShows() {
  const { contents, update, setUpdate, userBookmarks, loggedIn } = useOutletContext();

  const allTvshows = contents.filter(
    (content) => content.category === "TV Series"
  );

  return (
    <>
      <Search array={allTvshows} update={update} setUpdate={setUpdate} userBookmarks={userBookmarks} loggedIn={loggedIn}/>
    </>
  );
}

export default TVShows;
