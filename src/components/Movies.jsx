// import MovieCard from "./MovieCard";
// import { useOutletContext } from "react";

// function Movies() {
//     const {contents} = useOutletContext();
//     return (
//         <>
//             <h1>Movies</h1>

function Movies() {
    return (
        <>
    
      <h1>Movies</h1>

       {itemsList.map((item) => (
        <MovieCard item={item} key={item.contentsId} />
      ))}
      
    </>
  );
}

export default Movies;
