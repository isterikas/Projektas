import { useEffect, useState } from "react";
import Card from "./Card";
import { getAllData } from "./helpers/get";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getUserBookmarks = async (loggedIn) => {
  const bookmarksData = await getAllData("userBookmarks");
  return bookmarksData.filter((bookmark) => bookmark.userId === loggedIn);
};

const getContents = async () => {
  return await getAllData("contents");
};

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
    const fetchRecommendations = async () => {
      const bookmarks = await getUserBookmarks(loggedIn);
      const allContents = await getContents();

      // Jei vartotojas neturi žymių, rodyti atsitiktinai permaišytą turinį
      if (bookmarks.length === 0) {
        setShuffledContents(shuffleArray([...contents]));
      } else {
        const bookmarkedContentsIds = bookmarks.map(
          (bookmark) => bookmark.contentsId
        );

        // Kombinacijų skaičiavimas pagal kategoriją ir reitingą
        const combinationCount = bookmarks.reduce((acc, bookmark) => {
          const content = allContents.find(
            (item) => item.contentsId === bookmark.contentsId
          );
          if (content) {
            const combinationKey = `${content.category} ${content.rating}`;
            acc[combinationKey] = (acc[combinationKey] || 0) + 1;
          }
          return acc;
        }, {});

        // Filtruoja , kad būtų tik nepažymėti klipai
        const nonBookmarkedContents = allContents.filter(
          (content) => !bookmarkedContentsIds.includes(content.contentsId)
        );

        // Vartotojo kategoriju pasirinkimo skaičiavimas
        const userCategoryCounts = bookmarks.reduce((acc, bookmark) => {
          const content = allContents.find(
            (item) => item.contentsId === bookmark.contentsId
          );
          if (content) acc[content.category] = (acc[content.category] || 0) + 1;
          return acc;
        }, {});

        // Vartotojo reitingų pasirinkimo skaičiavimas
        const userRatingCounts = bookmarks.reduce((acc, bookmark) => {
          const content = allContents.find(
            (item) => item.contentsId === bookmark.contentsId
          );
          if (content) acc[content.rating] = (acc[content.rating] || 0) + 1;
          return acc;
        }, {});

        // Default reitingai
        const ratingPriority = { E: 1, PG: 2, "18+": 3 };

        // Keisti reitingų prioritetus pagal vartotojo įpročius
        if (
          userRatingCounts["PG"] > userRatingCounts["18+"] &&
          userRatingCounts["PG"] > userRatingCounts["E"]
        ) {
          ratingPriority["PG"] = 1;
          ratingPriority["E"] = 2;
          ratingPriority["18+"] = 3;
        } else if (
          userRatingCounts["18+"] > userRatingCounts["PG"] &&
          userRatingCounts["18+"] > userRatingCounts["E"]
        ) {
          ratingPriority["18+"] = 1;
          ratingPriority["E"] = 2;
          ratingPriority["PG"] = 3;
        }

        // Kategorijų prioritetai pagal vartotojo įpročius
        const categoryPriority =
          userCategoryCounts["TV Series"] > userCategoryCounts["Movie"]
            ? { "TV Series": 1, Movie: 2 }
            : { Movie: 1, "TV Series": 2 };

        // Turinio rūšiavimas pagal kombinacijų balus, kategorijų ir reitingų prioritetus
        const sortedContents = nonBookmarkedContents
          .map((content) => ({
            ...content,
            score:
              combinationCount[`${content.category} ${content.rating}`] || 0,
          }))
          .sort(
            (a, b) =>
              b.score - a.score ||
              categoryPriority[a.category] - categoryPriority[b.category] ||
              ratingPriority[a.rating] - ratingPriority[b.rating]
          );

        setShuffledContents(sortedContents);
      }
    };

    // Rodyti atsitiktini turinį, jei vartotojas neprisijungęs
    if (!loggedIn) {
      setShuffledContents(shuffleArray([...contents]));
    } else {
      fetchRecommendations();
    }
  }, [contents, loggedIn]);

  return (
    <div>
      <div className="grid items-end justify-start h-16">
        <h2 className="content-heading text-white">Recommended for you</h2>
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
