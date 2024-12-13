import Recommended from "./Recommended";
import Trending from "./Trending";
import { useOutletContext } from "react-router";
import Search from "./Search";
import { updateTrending } from "./helpers/updateTrending";

function Homepage() {
  const {
    contents,
    loggedIn,
    update,
    setUpdate,
    userBookmarks,
    width,
    search,
  } = useOutletContext();
  const initTrending = async () => {
    try {
      await updateTrending();
      console.log("Initial trending update completed successfully.");
    } catch (error) {
      console.error("Initial trending update failed:", error);
    }
  };

  initTrending();
  return (
    <>
      <div className="lg:pl-40">
        <Search array={contents} />

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
