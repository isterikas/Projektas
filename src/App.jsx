import { Outlet } from "react-router";
import NavBar from "./components/NavBar.jsx";
import { useState, useEffect } from "react";
import { getAllData } from "./components/helpers/get.js";
import { usePersistState } from "@printy/react-persist-state";
import { userBookmarks, contents } from "../data/data.json";

export default function App() {
  const [search, setSearch] = useState("");
  const [authType, setAuthType] = usePersistState("login", "authType");
  const [loggedIn, setLoggedIn] = usePersistState("", "loggedIn");
  const [update, setUpdate] = useState(0);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loggedUser, setLoggedUser] = usePersistState({}, "loggedUser");
  const [width, setWidth] = useState(window.innerWidth);

  const [updatesOfTrending, setUpdatesOfTrending] = useState(0);
  const [updatesOfRecommended, setUpdatesOfRecommended] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    if (loggedIn && users.length > 0) {
      const thisUser = users.find((user) => user.id === loggedIn);

      setLoggedUser(thisUser);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [update]);

  useEffect(() => {
    if (loggedIn) findUser();
  }, [loggedIn, users]);

  return (
    <div className="inset-0 background-dark-blue h-dvh">
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
              users,
              setUsers,
              userBookmarks,
              update,
              setUpdate,
              width,
              loggedUser,
              setLoggedUser,
              isLoading,
              search,
              setSearch,
              error,
              setError,
              updatesOfRecommended,
              updatesOfTrending,
              setUpdatesOfRecommended,
              setUpdatesOfTrending,
            }}
          />
        ) : (
          <p>{error}</p>
        )}
      </div>
    </div>
  );
}
