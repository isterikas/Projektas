import { Outlet } from "react-router";
import NavBar from "./components/NavBar.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
