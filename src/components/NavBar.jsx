import { Link } from "react-router";

function NavBar() {
  return (
    <div className="p-[2rem] border bg-neutral-700 text-white rounded">
      <nav className="grid grid-cols-3">
        <div>
        </div>
        <div className="flex justify-between">
          <Link to="">
            <span>Homepage</span>
          </Link>
          <Link to="/movies">
            <span>Movies</span>
          </Link>
          <Link to="/tvshows">
            <span>TVShows</span>
          </Link>
          <Link to="/bookmarks">
            <span>Bookmarks</span>
          </Link>
        </div>
        <div className="text-right">
          <Link to="/authorization">
            <span>Log In</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
