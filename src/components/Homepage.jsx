import Recommended from "./Recommended";
import Trending from "./Trending";
import { useOutletContext } from "react-router";
import Search from "./Search";

function Homepage() {
  const {
    contents,
    userBookmarks,
    loggedIn,
    update,
    setUpdate,
    width,
    search,
  } = useOutletContext();

  return (
    <>
      <div className="lg:pl-40">
        <Search
          array={contents}
          update={update}
          setUpdate={setUpdate}
          userBookmarks={userBookmarks}
          loggedIn={loggedIn}
          width={width}
        />

        {search ? (
          ""
        ) : (
          <Trending
            contents={contents}
            width={width}
            update={update}
            setUpdate={setUpdate}
            userBookmarks={userBookmarks}
            loggedIn={loggedIn}
          />
        )}
        {search ? (
          ""
        ) : (
          <Recommended
            contents={contents}
            update={update}
            setUpdate={setUpdate}
            userBookmarks={userBookmarks}
            loggedIn={loggedIn}
            width={width}
          />
        )}
      </div>
    </>
  );
}

export default Homepage;
