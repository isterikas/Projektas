import Recommended from "./Recommended";
import Trending from "./Trending";
import { useOutletContext } from "react-router";
import { useEffect } from "react";

function Homepage() {
  const { contents, loggedIn, setAuthType } = useOutletContext();

  const pageBack = () => {
    if (!loggedIn) setAuthType("");
  };

  useEffect(() => {
    pageBack();
  }, []);

  return (
    <>
      <Trending contents={contents} />
      <Recommended />
    </>
  );
}

export default Homepage;
