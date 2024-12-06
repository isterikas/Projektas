import Recommended from "./Recommended";
import Trending from "./Trending";
import Movies from "./Movies";
import MovieCard from "./MovieCard";
import { useOutletContext } from "react-router";

function Homepage() {
    const {contents} = useOutletContext();
    return (
        <>
            <Trending contents={contents}/>
            <Recommended />
            {/* <MovieCard/> */}
        </>
    );
}

export default Homepage;