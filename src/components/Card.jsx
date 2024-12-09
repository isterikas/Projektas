// import { NavLink } from "react-router";


function Card({ item }) {

    const {thumbnail, title, year, category, rating, } = item;
   console.log(thumbnail);
   

    return (
      <div className="shadow m-3">
        <div><img src={"src" + thumbnail.regular.small.slice(1)} alt="#" /></div>
        <p className="body-s text-white"> {year}</p>
        <p className="body-s text-white"> {category}</p>
        <p className="body-s text-white"> {rating}</p>
        <h1 className="heading-xs text-white"> {title}</h1>
      </div>
      );
}

export default Card;