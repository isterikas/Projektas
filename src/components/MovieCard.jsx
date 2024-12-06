// import { NavLink } from "react-router";


function MovieCard({ item }) {
  // const { item, setItems } = props;
    const { movie, year, category, rating, title, contentsId } = item;

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