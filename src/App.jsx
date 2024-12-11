import { Outlet } from "react-router";
import NavBar from "./components/NavBar.jsx";
import { useState, useEffect,  } from "react";
import { getAllData } from "./components/helpers/get.js";
import { usePersistState } from '@printy/react-persist-state';

export default function App() {
  const [authType, setAuthType] = usePersistState("", "login");
  const [loggedIn, setLoggedIn] = usePersistState("0", "")

  const [contents, setContents] = useState([]);
  const [update, setUpdate] = useState(0);
  const [users, setUsers] = useState([]);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [error, setError] = useState("");

  const getAllcontents = async () => {
    try {
      const contents = await getAllData("contents");
      setContents(contents);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const getAllUsers = async () => {
    try {
      const users = await getAllData("users");
      setUsers(users);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const getAllUserBookmarks = async () => {
    try {
      const userBookmarks = await getAllData("userBookmarks");
      setUserBookmarks(userBookmarks);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const pageBack = () => {
    if (!loggedIn) setAuthType("");
  };

  useEffect(() => {
    getAllcontents();
    getAllUsers();
    getAllUserBookmarks();
  }, [update]);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loggedUser = users.find((user) => user.id === loggedIn);

  return (
    <div >
      <div className=" lg:m-[32px] lg:absolute background-dark-blue">
        <NavBar
          authType={authType}
          setAuthType={setAuthType}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
        />
      </div>
      <div className="background-dark-blue">
        {!error ? (
          <Outlet
            context={{
              authType,
              setAuthType,
              loggedIn,
              setLoggedIn,
              contents,
              setContents,
              users,
              setUsers,
              userBookmarks,
              setUserBookmarks,
              update,
              setUpdate,
              pageBack,
              width,
              loggedUser,
            }}
          />
        ) : (
          <p>{error}</p>
        )}
      </div>
    </div>
  );
}
