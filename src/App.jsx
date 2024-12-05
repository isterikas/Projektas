import { Route, Routes } from "react-router";
import NavBar from "./components/NavBar.jsx";
import Auth from "./components/Auth.jsx";
import Homepage from "./components/Homepage.jsx";
import Movies from "./components/Movies.jsx";
import TVShows from "./components/TVShows.jsx";
import Trending from "./components/Trending.jsx";
import Recommended from "./components/Recommended.jsx";
import Bookmarks from "./components/Bookmarks.jsx";
import NotFound from "./components/NotFound.jsx";
import { getAllData } from "./components/helpers/get";


export default function App() {

  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(0);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const data = await getAllData();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
       fetchData();
  }, [update]);  

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvshows" element={<TVShows />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
