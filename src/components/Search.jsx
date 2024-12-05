import { useState } from "react";

function Search() {
  const [search, setSearch] = useState("");
  console.log(search);
  

  return (
    <>
      <form className="nosubmit">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="nosubmit rounded bg-red-500"
          type="search"
          placeholder="Search for movies or TV series"
        />
      </form>

    </>
  );
}

export default Search;
