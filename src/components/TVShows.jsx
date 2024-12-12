import { useOutletContext } from "react-router";
import Search from "./Search";

function TVShows() {
  const { contents, update, setUpdate, userBookmarks, loggedIn, width } =
    useOutletContext();

  const allTvshows = contents.filter(
    (content) => content.category === "TV Series"
  );

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
