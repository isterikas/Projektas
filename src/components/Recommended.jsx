import Card from "./Card";

// kazkur iskelti
import { updateTrending } from "./helpers/updateTrending";

const testUpdateTrending = async () => {
  try {
    await updateTrending();
    console.log("Test update completed successfully.");
  } catch (error) {
    console.error("Test update failed:", error);
  }
};

testUpdateTrending();

// Atsitiktine tvarka maišome masyvą. Kol kas naudoju kai useris neprisijungęs
// (vėliau kai neprisijungęs || neturi bookmarks || papildyti jai neužtenka rekomendacijų)
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
  let shuffledContents = contents;

  // Kai vartotojas neprisijungęs || nežinomas
  if (!loggedIn) {
    shuffledContents = shuffleArray(contents);
  }
  // Parašyti helpers user aktyvumui ivertinti
  // Kai vartotojas buvo neaktyvus (nepazymėjo naujų bookmark)

  // Kai vartotojas buvo aktyvus (pažymėjo naujus bookmark)

  // sutvarkyti, Search for movies or TV series, perkelti po navbar
  return (
    <>
      <h2 className=" background-dark-blue text-white heading-l">
        Recommended for you
      </h2>
      <div className="p-3 grid grid-cols-2 md:grid-cols:3 lg:grid-cols-4">
        {" "}
        {shuffledContents.map((item) => (
          <div key={item.contentsId}>
            {" "}
            <Card
              item={item}
              update={update}
              setUpdate={setUpdate}
              userBookmarks={userBookmarks}
              loggedIn={loggedIn}
              width={width}
            />{" "}
          </div>
        ))}{" "}
      </div>
    </>
  );
}

export default Recommended;
