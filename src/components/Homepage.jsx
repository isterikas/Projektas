import Recommended from "./Recommended";
import Trending from "./Trending";

function Homepage() {
    return (
        <><h1 className="text-[5rem] pt-[3rem] text-center">Home</h1>
            <Trending />
            <Recommended />
        </>
    );
}

export default Homepage;