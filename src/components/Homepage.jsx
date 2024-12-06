import Recommended from "./Recommended";
import Trending from "./Trending";
import { useOutletContext } from "react-router";

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