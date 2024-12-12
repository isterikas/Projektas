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
import ErrorPage from "./components/ErrorPage.jsx";
import { ErrorBoundary } from "react-error-boundary";
import UserAccount from "./components/UserAccount.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    
    <BrowserRouter>
    <ErrorBoundary fallback={<ErrorPage/>} >
      <Routes>
   
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} />
          <Route path="/authorization" element={<Auth />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvseries" element={<TVShows />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/account" element={<UserAccount />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        
      </Routes>
      </ErrorBoundary>
     
    </BrowserRouter>
 
  </StrictMode>
);
