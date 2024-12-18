import Recommended from "./Recommended";
import Trending from "./Trending";
import { useOutletContext } from "react-router";
import Search from "./Search";
import { updateTrending } from "./helpers/updateTrending";
import { useEffect, useState } from "react";

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

  const initTrending = async () => {
    try {
      await updateTrending();
      // console.log("Initial trending update completed successfully.");
    } catch (error) {
      console.error("Initial trending update failed:", error);
    }
  };

  // useEffect(() => {
  //   initTrending();
  // }, [loggedIn]);

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
