import { Outlet } from "react-router";
import NavBar from "./components/NavBar.jsx";
import { useState, useEffect } from "react";
import { getAllData } from "./components/helpers/get.js";
import { usePersistState } from "@printy/react-persist-state";

export default function App() {
  const [search, setSearch] = useState("");
  const [authType, setAuthType] = usePersistState("login", "authType");
  const [loggedIn, setLoggedIn] = usePersistState("", "loggedIn");
  const [contents, setContents] = useState([]);
  const [update, setUpdate] = useState(0);
  const [users, setUsers] = useState([]);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loggedUser, setLoggedUser] = usePersistState({}, "loggedUser");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getAllcontents = async () => {
    try {
      const contents = await getAllData("contents");
      setContents(contents);
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

  const getAllUsers = async () => {
    try {
      const users = await getAllData("users");
      setUsers(users);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const findUser = async () => {
    if (loggedIn && users.length > 0 && !loggedUser) {
      const thisUser = users.find((user) => user.id === loggedIn);
      console.log("test");
      setLoggedUser(thisUser);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllcontents();
    getAllUserBookmarks();
    getAllUsers();
    if (loggedIn) findUser();
  }, [update, loggedIn]);

  return (
    <div className="inset-0 background-dark-blue h-dvh">
      <div className="lg:m-[32px] lg:absolute background-dark-blue">
        <NavBar
          authType={authType}
          setAuthType={setAuthType}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
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
              width,
              setIsLoading,
              loggedUser,
              setLoggedUser,
              isLoading,
              search,
              setSearch,
              error,
              setError,
            }}
          />
        ) : (
          <p>{error}</p>
        )}
      </div>
    </div>
  );
}
