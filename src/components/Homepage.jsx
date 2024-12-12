import Recommended from "./Recommended";
import Trending from "./Trending";
import { useOutletContext } from "react-router";
import { useEffect } from "react";
import Search from "./Search";

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
    search
  } = useOutletContext();

  useEffect(() => {
    pageBack();
  }, []);

  return (
    <>
    <div className="lg:pl-40">
    <Search array={contents}/>
    
    {search? "" : 
      <Trending
        contents={contents}
        width={width}
        update={update}
        setUpdate={setUpdate}
        userBookmarks={userBookmarks}
        loggedIn={loggedIn}
      />}
      {search? "" : 
      <Recommended
        contents={contents}
        update={update}
        setUpdate={setUpdate}
        userBookmarks={userBookmarks}
        loggedIn={loggedIn}
        width={width}
      />}</div>
    </>
  );
}

export default Homepage;
