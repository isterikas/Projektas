import Search from "./Search";

// Atsitiktine tvarka maišome masyvą. Kol kas naudoju kai useris neprisijungęs
// (vėliau kai neprisijungęs || neturi bookmarks || papildyti jai neužtenka rekomendacijų)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Recommended({ contents, update, setUpdate, loggedIn, userBookmarks }) {

  let shuffledContents = contents;

  // Kai vartotojas neprisijungęs || nežinomas
  if (!loggedIn) {
    shuffledContents = shuffleArray(contents);
  }
  // Parašyti helpers user aktyvumui ivertinti
  // Kai vartotojas buvo neaktyvus (nepazymėjo naujų bookmark)

  // Kai vartotojas buvo aktyvus (pažymėjo naujus bookmark)
  return (
    // sutvarkyti, Search for movies or TV series, perkelti po navbar
    <>
      <Search array={shuffledContents} update={update} setUpdate={setUpdate} userBookmarks={userBookmarks} loggedIn={loggedIn} />
    </>
  );
}

export default Recommended;
