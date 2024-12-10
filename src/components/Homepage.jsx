import Recommended from "./Recommended";
import Trending from "./Trending";
import { useOutletContext } from "react-router";
import { useEffect } from "react";

function Homepage() {
  const { contents, loggedIn, setAuthType, update, setUpdate, userBookmarks, pageBack } = useOutletContext();

  const pageBack = () => {
    if (!loggedIn) setAuthType("");
  };

  useEffect(() => {
    pageBack();
  }, []);

  return (
    <>
      <Trending contents={contents} />
      <Recommended contents={contents} update={update} setUpdate={setUpdate} userBookmarks={userBookmarks} loggedIn={loggedIn}/>
    </>
  );
}

export default Homepage;
