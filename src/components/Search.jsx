import Card from "./Card.jsx";
import { useLocation, useOutletContext, useSearchParams } from "react-router";
import { InputMask } from "@react-input/mask";

function Search({ array, update, setUpdate, loggedIn, userBookmarks, width }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const pattern = /^[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-\s]+$/;
  const valid = pattern.test(searchQuery);

  if (searchQuery && !valid) {
    throw new Error();
  }

  const location = useLocation();
  const { setSearch } = useOutletContext();

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value.trim();
    setSearchParams(value ? { search: value } : {});
    if (value) {
      return true;
    } else {
      return false;
    }
  };
  handleSearch ? setSearch(searchQuery) : setSearch("");

  const locationInfo = () => {
    switch (location.pathname) {
      case "/movies":
        return { placeholder: "Search for movies", header: "Movies" };
      case "/tvseries":
        return { placeholder: "Search for TV Series", header: "TV Series" };
      case "/bookmarks":
        return { placeholder: "Search for bookmarked shows", header: "" };
      default:
        return { placeholder: "Search for movies or TV series", header: "" };
    }
  };

  const filteredArray = array
    .filter((content) =>
      content.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((item) => {
      return (
        <div key={item.contentsId}>
          <Card
            item={item}
            key={item.contentsId}
            update={update}
            setUpdate={setUpdate}
            userBookmarks={userBookmarks}
            loggedIn={loggedIn}
            width={width}
          />
        </div>
      );
    });

  return (
    <>
      <div className="w-full min-h-fit">
        <form className="nosubmit background-dark-blue">
          <InputMask
            onChange={handleSearch}
            onKeyDown={(e) => {
              e.key === "Enter" ? e.preventDefault() : "";
            }}
            className="focus:ring-0 nosubmit rounded caret-[#FC4747] text-white heading-m border-b border-white focus:border-b-2"
            type="search"
            placeholder={locationInfo().placeholder}
            mask={"______________________________"}
            replacement={{ _: /[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-\s]/ }}
            defaultValue={handleSearch ? searchQuery : ""}
          />
        </form>

        <div className="background-dark-blue">
          {searchQuery == "" ? (
            <h1 className="content-heading text-white">
              {locationInfo().header}
            </h1>
          ) : (
            <h1 className="content-heading text-white">
              Found {filteredArray.length}
              {filteredArray.length === 1 ? " result" : " results"} for{" "}
              {`'${searchQuery}'`}
            </h1>
          )}
          <div className="p-3 grid grid-cols-2 md:grid-cols:3 lg:grid-cols-4">
            {location.pathname === "/" || location.pathname === "/bookmarks"
              ? searchQuery
                ? filteredArray
                : ""
              : filteredArray}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
