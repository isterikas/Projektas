import Card from "./Card";
import { useOutletContext } from "react-router";


function Movies({itemsList}) {
    
    const {contents} = useOutletContext();
    const movies = contents.filter((show )=> show.category === "Movie")

    return (
        <>
    
      <h1>Movies</h1>

       {movies.map((item) => (
        <Card item={item} key={item.contentsId} />
      ))}
      
    </>
  );
}

export default Movies;