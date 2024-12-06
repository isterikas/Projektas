import Recommended from "./Recommended";
import Trending from "./Trending";

function Homepage() {
    const {contents} = useOutletContext();
    return (
        <>
            <Trending contents={contents}/>
            <Recommended />
        </>
    );
}

export default Homepage;