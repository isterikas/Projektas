import { Outlet } from "react-router";
import NavBar from "./components/NavBar.jsx";
import { useState, useEffect } from "react";
import { getAllData } from "./components/helpers/get.js";
import { usePersistState } from "@printy/react-persist-state";

export default function App() {
  const [authType, setAuthType] = usePersistState("login", "auth-type");
  const [loggedIn, setLoggedIn] = usePersistState("", "userId");

  const [contents, setContents] = useState([]);
  const [update, setUpdate] = useState(0);
  const [users, setUsers] = useState([]);
  const [userBookmarks, setUserBookmarks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loggedUser, setLoggedUser] = usePersistState({},"loggedUser");

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
    if (loggedIn && users.length > 0) {
      const thisUser = users.find((user) => user.id === loggedIn);
      console.log(


        
      )
    
        setLoggedUser(thisUser);
     
    
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    getAllcontents();
    getAllUserBookmarks();
    getAllUsers();
    if(loggedIn) {
    findUser();}
  }, [loggedIn, update,]); 

  return (
    <div>
      <div className="md:m-[24px] lg:m-[32px] lg:absolute">
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
              width,
              loggedUser,
              setLoggedUser,
              isLoading,
            }}
          />
        ) : (
          <p>{error}</p>
        )}
      </div>
    </div>
  );
}
