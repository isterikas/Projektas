// import { NavLink } from "react-router";


function Card({ item }) {


    const {thumbnail, title, year, category, rating, contentsId } = item;
   console.log(thumbnail);
   

    return (
        <div className="shadow m-3">
      
        
        <div><img src={"src" + thumbnail.regular.small.slice(1)} alt="" /></div>
        <p> {year}</p>
        <p> {category}</p>
        <p> {rating}</p>
        <h1> {title}</h1>
      </div>
      );
}

export default Card;