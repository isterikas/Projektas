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
    const fetchRecommendations = () => {
      const bookmarks = userBookmarks;
      const allContents = contents;

      if (bookmarks.length === 0) {
        setShuffledContents(shuffleArray([...contents]));
        return;
      }

      const bookmarkedContentsIds = bookmarks.map(
        (bookmark) => bookmark.contentsId
      );

      const { combinationCount, userCategoryCounts, userRatingCounts } =
        bookmarks.reduce(
          (acc, bookmark) => {
            const content = allContents.find(
              (item) => item.contentsId === bookmark.contentsId
            );
            if (content) {
              const combinationKey = `${content.category} ${content.rating}`;
              acc.combinationCount[combinationKey] =
                (acc.combinationCount[combinationKey] || 0) + 1;
              acc.userCategoryCounts[content.category] =
                (acc.userCategoryCounts[content.category] || 0) + 1;
              acc.userRatingCounts[content.rating] =
                (acc.userRatingCounts[content.rating] || 0) + 1;
            }
            return acc;
          },
          { combinationCount: {}, userCategoryCounts: {}, userRatingCounts: {} }
        );

      const nonBookmarkedContents = allContents.filter(
        (content) => !bookmarkedContentsIds.includes(content.contentsId)
      );

      // Numatyti reitingai
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
      let categoryPriority = {};
      const totalCategories = Object.keys(userCategoryCounts).reduce(
        (acc, category) => acc + userCategoryCounts[category],
        0
      );
      Object.keys(userCategoryCounts).forEach((category) => {
        categoryPriority[category] =
          (userCategoryCounts[category] / totalCategories) * 100;
      });

      // Turinio rūšiavimas pagal kombinacijų balus, kategorijų ir reitingų prioritetus
      const sortedContents = nonBookmarkedContents
        .map((content) => ({
          ...content,
          score: combinationCount[`${content.category} ${content.rating}`] || 0,
        }))
        .sort(
          (a, b) =>
            b.score - a.score ||
            categoryPriority[a.category] - categoryPriority[b.category] ||
            ratingPriority[a.rating] - ratingPriority[b.rating]
        );

      setShuffledContents(sortedContents);
    };

    if (!loggedIn) {
      setShuffledContents(shuffleArray([...contents]));
    } else {
      fetchRecommendations();
    }
  }, [contents, loggedIn, userBookmarks]);

  return (
    <div>
      <div className="grid items-end justify-start h-16">
        <h2 className="background-dark-blue text-white heading-l ml-5">
          Recommended for you
        </h2>
      </div>

      <div
        className={
          shuffledContents.length > 0
            ? "p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : ""
        }
      >
        {shuffledContents.length > 0 ? (
          shuffledContents.map((item) => (
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
          ))
        ) : (
          <p className="content-text m-5 text-white">
            Currently there are no Movies or TV Series to recommend - come back
            later!
          </p>
        )}
      </div>
    </div>
  );
}

export default Recommended;
