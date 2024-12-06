import MovieCard from "./MovieCard";


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