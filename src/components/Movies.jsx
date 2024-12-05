import MovieCard from "./MovieCard";


function Movies() {
    return (

        <>
            <h1>Movies</h1>

        {moviesList.map((card) => (
            <Movie card={card} key={card.id} />
          ))}

        </>  
    ) ;
}

export default Movies;