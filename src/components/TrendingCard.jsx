import { useEffect, useState } from "react";
import { deleteBookmark } from "./helpers/delete.js";
import { postData } from "./helpers/post.js";
import movieIcon from "../assets/icons/icon-nav-movies.svg";

function TrendingCard({ slide, userBookmarks, setUpdate, update, loggedIn}) {
  const {title, year, category, rating } = slide;

  return (
    <div className="shadow m-3 ">
      
      <div className="flex mt-3 gap-2 relative">
        <p className="body-s text-white"> {year}</p>
        <p className="body-s  text-white ">.</p>
        <img className="body-s mt-0.5 w-[15px] h-[15px]" src={movieIcon} alt="SVG Image" />
        <p className="body-s text-white"> {category}</p>
        <p className="body-s text-white">.</p>
        <p className="body-s text-white"> {rating}</p>
      </div>
      <h1 className="heading-xs text-white"> {title}</h1>
      
    </div>
  );
}

export default TrendingCard;
