import Recommended from "./Recommended";
import Trending from "./Trending";
import Movies from "./Movies";
import MovieCard from "./MovieCard";

function Homepage() {
    return (
        <>
            <Trending />
            <Recommended />
            <MovieCard/>
        </>
    );
}

export default Homepage;