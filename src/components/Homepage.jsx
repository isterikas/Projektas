import Recommended from "./Recommended";
import Trending from "./Trending";
import Movies from "./Movies";

function Homepage() {
    return (
        <>

        <h1>Movies</h1>
            <Trending />
            <Recommended />
            <Movies/>
        </>
    );
}

export default Homepage;