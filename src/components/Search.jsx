import { useState } from "react";
import Card from "./Card.jsx";
import { useLocation } from "react-router";

function Search({ array }) {
  const [search, setSearch] = useState("");
  const location = useLocation();

  const getPlaceholder = () => {
    switch (location.pathname) {
      case "/movies":
        return "Search for movies";
      case "/tvshows":
        return "Search for TV Shows";
      case "/bookmarks":
        return "Search for bookmarked shows";
      default:
        return "Search for movies or TV series";
    }
  };

  const filteredArray = array
    .filter((content) =>
      content.title.toLowerCase().includes(search.toLowerCase())
    )
    .map((item) => {
      return (
        <>
          <Card item={item} key={item.contentsId} />
        </>
      );
    });

  return (
    <>
      <form className="nosubmit">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="nosubmit rounded bg-red-500"
          type="search"
          placeholder={getPlaceholder()}
        />
      </form>

      <div className="bg-teal-600 p-3 grid grid-cols-3">
        {filteredArray} <br />
        {search ? (
          <h1 className="font-bold">
            Found {filteredArray.length}{" "}
            {filteredArray.length === 1 ? "result" : "results"} for {search}
          </h1>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Search;
