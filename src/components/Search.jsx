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
      <form className="nosubmit background-dark-blue">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="nosubmit rounded caret-[#FC4747] text-white heading-m "
          type="search"
          placeholder={getPlaceholder()}
        />
      </form>

      <div className="background-dark-blue p-3 grid grid-cols-3">
        {filteredArray} <br />
        {search ? (
          <h1 className="heading-l text-white">
            Found {filteredArray.length}
            {filteredArray.length === 1 ? " result" : " results"} for{" "}
            {`"${search}"`}
          </h1>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Search;
