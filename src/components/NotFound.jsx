import { Link } from "react-router";

function NotFound() {
  return (
    <div className="text-center text-[5rem] pt-[3rem]">
      <h1>404 Not Found</h1>
      <Link to="/">
        <button type="button">Go Back!</button>
      </Link>
    </div>
  );
}

export default NotFound;
