// import { NavLink } from "react-router";


function TrendingCard({ slide }) {

    const {thumbnail, title, year, category, rating, contentsId } = slide;
   console.log(thumbnail);
   

    return (
      <div className="shadow m-3">
       <div className=" flex flex-row gap-1">
        <p className="body-s text-white"> {year}</p>
        <p className="body-s text-white"> {category}</p>
        <p className="body-s text-white"> {rating}</p>
      </div>
        <h1 className="heading-xs text-white"> {title}</h1>
      </div>
      
      );
}

export default TrendingCard;