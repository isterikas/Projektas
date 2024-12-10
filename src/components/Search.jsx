import Card from "./Card.jsx";
import { useLocation, useSearchParams } from "react-router";

function Search({ array, update, setUpdate, loggedIn, userBookmarks }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const location = useLocation();

  const handleSearch = (e) => {
    const value = (e.target.value).trim();
    setSearchParams(value ? { search: value } : {});
  };

  const getPlaceholder = () => {
    switch (location.pathname) {
      case "/movies":
        return "Search for movies";
      case "/tvseries":
        return "Search for TV Series";
      case "/bookmarks":
        return "Search for bookmarked shows";
      default:
        return "Search for movies or TV series";
    }
  };

  const getTitle = () => {
    switch (location.pathname) {
      case "/movies":
        return "Movies";
      case "/tvseries":
        return "TV Series";
      default:
        return "Bookmarked shows";
    }
  };

  const filteredArray = array
    .filter((content) =>
      content.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((item) => {
      return (
        <div key={item.contentsId}>
          <Card item={item} key={item.contentsId} update={update} setUpdate={setUpdate} userBookmarks={userBookmarks} loggedIn={loggedIn} />
        </div>
      );
    });

  return (
    <>
      <form className="nosubmit background-dark-blue">
        <input
          onChange={handleSearch}
          className="nosubmit rounded caret-[#FC4747] text-white heading-m border-b border-white focus:border-b-2"
          type="search"
          placeholder={getPlaceholder()}
        />
      </form>

      <div className="background-dark-blue">
        {searchParams == "" ? (
          <h1 className="content-heading text-white">{getTitle()}</h1>
        ) : (
          <h1 className="content-heading text-white">
            Found {filteredArray.length}
            {filteredArray.length === 1 ? " result" : " results"} for{" "}
            {`'${searchQuery}'`}
          </h1>
        )}
        <div className="p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredArray}
        </div>
      </div>
    </>
  );
}

export default Search;
