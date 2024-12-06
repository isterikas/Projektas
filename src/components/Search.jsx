import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "./helpers/jsonURL.js";

function Search() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [content, setContent] = useState([]);
  console.log(search);
  console.log(error);

  const getAllData = async () => {
    const response = await axios.get(url("contents"));
    return response.data;
  }; //tailored getAllData function; will have to be deleted once fetch will be executed on the main page.

  const fetchData = async () => {
    try {
      const data = await getAllData();
      setContent(data);
    } catch (error) {
      setError(error.message);
    }
  }; //will have to be deleted and array of content should be passed through props, params or context.

  useEffect(() => {
    fetchData();
  }, [search]);

  const filteredArray = content
  .filter((content) =>
    content.title.toLowerCase().includes(search.toLowerCase())
  )
  .map((item) => {
    return (
      <>
        <p>{item.title}</p>


      </>
    );
  })

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

      <div className="bg-teal-600 p-3 grid grid-cols-3">
        {filteredArray} <br />
        {search? <h1 className="font-bold">Found {filteredArray.length} {filteredArray.length === 1? "result" : "results"} for "{search}"</h1> : ""}
      </div>
    </>
  );
}

export default Search;
