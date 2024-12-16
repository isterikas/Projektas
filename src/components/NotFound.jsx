import { Link } from "react-router";

function NotFound() {
  return (
    <div className="text-center pt-[10rem] h-[100vh] background-dark-blue
     text-white">
      <h1 className="text-[3rem] p-4">404 Page is Not Found!</h1>
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
