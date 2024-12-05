import Recommended from "./Recommended";
import Trending from "./Trending";

function Homepage() {
    return (
        <><h1 className="text-[rem] pt-[3rem] text-center">Movies</h1>
            <Trending />
            <Recommended />
        </>
    );
}

export default Homepage;