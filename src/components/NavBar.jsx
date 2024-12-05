import { Link } from "react-router";

function NavBar(props) {
  const {setAuthType, loggedin } = props;

  const sigin = () => {
    setAuthType("sigin");
  };

  const login = () => {
    setAuthType("login");
  };
  return (
    <div className="p-[2rem] border bg-neutral-700 text-white rounded">
      <nav className="grid grid-cols-3">
        <div>ICON</div>
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
          {!loggedin ? (
            <div>
              <Link to="/authorization">
                <button
                  className="me-2"
                  type="button"
                  value="login"
                  onClick={login}
                >
                  Log In
                </button>
              </Link>
              <Link to="/authorization">
                <button
                  className="ms-2"
                  type="button"
                  onClick={sigin}
                >
                  Sign up
                </button>
              </Link>
            </div>
          ) : (
            <div>ShowIcon</div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
