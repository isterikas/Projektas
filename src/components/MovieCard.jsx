// import { NavLink } from "react-router";


function MovieCard() {
    const { movie, year, category, rating, title, id } = card;

    return (
        <div className="shadow m-3">
        <h1> {movie}</h1>
        <p> {year}</p>
        <p> {category}</p>
        <p> {rating}</p>
        <p> {title}</p>
      </div>
      );
}

export default MovieCard;