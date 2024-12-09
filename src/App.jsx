import { Outlet } from "react-router";
import NavBar from "./components/NavBar.jsx";
import { useState, useEffect } from "react";
import { getAllData } from "./components/helpers/get.js";

export default function App() {
  const [authType, setAuthType] = useState("");
  const [loggedIn, setLoggedIn] = useState("");

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
  }, []);

  return (
    <div className="lg:flex">
      <div className="md:m-[24px] lg:m-[32px]">
        <NavBar
          authType={authType}
          setAuthType={setAuthType}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
        />
      </div>
      <div>
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
            }}
          />
        ) : (
          <p>{error}</p>
        )}
      </div>
    </div>
  );
}
