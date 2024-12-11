import Recommended from "./Recommended";
import Trending from "./Trending";
import { useOutletContext } from "react-router";
import { useEffect } from "react";

function Homepage() {
  const {
    contents,
    loggedIn,
    setAuthType,
    update,
    setUpdate,
    userBookmarks,
    pageBack,
    width,
  } = useOutletContext();

  useEffect(() => {
    pageBack();
  }, []);

  return (
    <>
      <div className="lg:pl-40">
        <Trending
          contents={contents}
          width={width}
          update={update}
          setUpdate={setUpdate}
          userBookmarks={userBookmarks}
          loggedIn={loggedIn}
        />
        <Recommended
          contents={contents}
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

export default Homepage;
