// import { NavLink } from "react-router";


function Card({ item }) {

  const { thumbnail, title, year, category, rating, contentsId } = item;


  return (

    <div className="columns-1">
      <div className="movies mx-3  ">  <span className="material-symbols-outlined ml-60">
          bookmark
        </span>
        <div className=" " >< img className="  rounded-lg " src={"src" + thumbnail.regular.small.slice(1)} alt="#" />  
      
         </div>
        
        <div>
          <p className="body-s text-white"> {year}</p>
          <p className="body-s text-white"> {category}</p>
          <p className="body-s text-white"> {rating}</p>
          <h1 className="heading-xs text-white"> {title}</h1>
        </div>
      </div>
    </div>
  );
}

export default Card;