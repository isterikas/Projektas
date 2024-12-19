import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import "./index.css";
import App from "./App.jsx";
import Homepage from "./components/Homepage.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Loading from "./components/Loading.jsx";
const LazyAuth = lazy(() => import("./components/Auth.jsx"));
const LazyMovies = lazy(() => import("./components/Movies.jsx"));
const LazyTVShows = lazy(() => import("./components/TVShows.jsx"));
const LazyBookmarks = lazy(() => import("./components/Bookmarks.jsx"));
const LazyNotFound = lazy(() => import("./components/NotFound.jsx"));
const LazyUserAccount = lazy(() => import("./components/UserAccount.jsx"));
const LazyAccountDeleted = lazy(()=>import("./components/AccountDeleted.jsx"))

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<ErrorPage />}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Homepage />} />
            <Route
              path="/authorization"
              element={
                <Suspense fallback={<Loading />}>
                  <LazyAuth />
                </Suspense>
              }
            />
            <Route
              path="/movies"
              element={
                <Suspense fallback={<Loading />}>
                  <LazyMovies />
                </Suspense>
              }
            />
            <Route
              path="/tvseries"
              element={
                <Suspense fallback={<Loading />}>
                  <LazyTVShows />
                </Suspense>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <Suspense fallback={<Loading />}>
                  <LazyBookmarks />
                </Suspense>
              }
            />
            <Route
              path="/account"
              element={
                <Suspense fallback={<Loading />}>
                  <LazyUserAccount />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <LazyNotFound />
              </Suspense>
            }/>
          <Route path="/account/deleted" element={<Suspense fallback={<Loading />}><LazyAccountDeleted /></Suspense>}/>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
