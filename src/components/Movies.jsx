// import MovieCard from "./MovieCard";
// import { useOutletContext } from "react";

// function Movies() {
//     const {contents} = useOutletContext();
//     return (
//         <>
//             <h1>Movies</h1>
import { useOutletContext } from "react-router";
function Movies() {
  const {contents} = useOutletContext();
    return (
    <>
      <h1>Movies</h1>
      {contents.map((item) => (
        <MovieCard item={item} key={item.contentsId} />
      ))}

    </>
  );
}

export default Movies;
