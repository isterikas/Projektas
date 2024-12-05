import { Outlet } from "react-router";
import NavBar from "./components/NavBar.jsx";
import { useState } from "react";

export default function App() {

const [authType, setAuthType] = useState("login");
const [loggedIn, setLoggedIn] = useState("")


  return (
    <>
      <NavBar setAuthType={setAuthType} loggedIn={loggedIn}/>
      <Outlet context={{authType, setAuthType, loggedIn, setLoggedIn}} />
    </>
  );
}
