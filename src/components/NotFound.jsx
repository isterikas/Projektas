import { Link } from "react-router";

function NotFound() {
  return (
    <div className="text-center mt-[10rem]">
      <h1 className="text-[5rem] p-4">404 Page is Not Found!</h1>
      <Link to="/">
        <button
          type="button"
          className="bg-slate-500 text-xl px-5 py-3 rounded-md text-white"
        >
          Go Back!
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
