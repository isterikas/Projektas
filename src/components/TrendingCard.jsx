// import { NavLink } from "react-router";

function TrendingCard({ slide }) {
  const { title, year, category, rating } = slide;

  return (
    <div className="">
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
