// import { NavLink } from "react-router";


function Card({ item }) {

    const {title, year, category, rating, thumbnail} = item;


    return (
        <div className="shadow m-3">
      
        <div><img src={`../src/${item.thumbnail.regular.small}`} alt="#" /></div>
        <p> {year}</p>
        <p> {category}</p>
        <p> {rating}</p>
        <h1> {title}</h1>
      </div>
      );
}

export default Card;