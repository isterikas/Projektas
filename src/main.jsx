import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { Routes, Route } from "react-router";
import NotFound from "./components/NotFound.jsx";
import Auth from "./components/Auth.jsx";
import Homepage from "./components/Homepage.jsx";
import Movies from "./components/Movies.jsx";
import TVShows from "./components/TVShows.jsx";
import Bookmarks from "./components/Bookmarks.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} />
          <Route path="/authorization" element={<Auth />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvseries" element={<TVShows />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
