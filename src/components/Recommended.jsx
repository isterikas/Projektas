import { useEffect, useState } from "react";
import Card from "./Card";


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Recommended({
  contents,
  update,
  setUpdate,
  loggedIn,
  userBookmarks,
  width,
}) {
  const [shuffledContents, setShuffledContents] = useState([]);

  useEffect(() => {
    // console.log("Contents on load:", contents);
    if (!loggedIn) {
      const shuffled = shuffleArray([...contents]);
      setShuffledContents(shuffled);
      // console.log("Shuffled contents:", shuffled);
    } else {
      setShuffledContents(contents);
      // console.log("Contents (logged in):", contents);
    }
    
  }, [contents, loggedIn]); // Priklausomybės nuo contents ir loggedIn
  return (
    <div>
      <div className="grid items-end justify-start h-16">
        <h2 className="background-dark-blue text-white heading-l ml-5">
          Recommended for you
        </h2>
      </div>

      <div className="p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {shuffledContents.map((item) => (
          <div key={item.contentsId}>
            <Card
              item={item}
              update={update}
              setUpdate={setUpdate}
              userBookmarks={userBookmarks}
              loggedIn={loggedIn}
              width={width}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommended;
