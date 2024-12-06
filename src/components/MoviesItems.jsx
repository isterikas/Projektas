import {useEffect, useState} from 'react';
import { getAllData } from "./helpers/get";
// import MovieCard from './MovieCard.jsx';
import Movies from "./Movies"


function MoviesItems() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");
  
    const getAllItems = async () => {
      try {
        const items = await getAll();
        setItems(items);
        setError("");
      } catch (error) {
        setError(error.message);
      }
    }
  
    useEffect(() => {
      getAllItems();
    }, [])

    return (
        <section>
        <Movies items={items} setItems={setItems} />
        {error && <p className="text-error">{error}</p>}
      </section>
      );
}

export default MoviesItems;