import { useNavigate, useOutletContext } from "react-router";
import Search from "./Search";
import Card from "./Card";
import { useEffect } from "react";

function Bookmarks() {
  const {
    contents,
    userBookmarks,
    loggedIn,
    update,
    setUpdate,
    width,
    search,
  } = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type != 1 && !loggedIn) navigate("/");
    }
  }, []);

  const allBookmarks = contents.filter((content) => {
    const isBookmarked = userBookmarks.find(
      (bookmark) =>
        bookmark.contentsId == content.contentsId && bookmark.userId == loggedIn
    );
    return isBookmarked;
  });

  const bookmarkedContent = (cat) => {
    let result2;
    const result = allBookmarks.filter((content) => content.category === cat);
    if (result.length === 0 && loggedIn) {
      return (
        <p className="body-m text-white">
          You do not have any bookmarks in this category.
        </p>
      );
    } else {
      result2 = result.map((item) => {
        return (
          <div key={item.contentsId}>
            <Card
              item={item}
              key={item.contentsId}
              update={update}
              setUpdate={setUpdate}
              loggedIn={loggedIn}
              width={width}
            />
          </div>
        );
      });
      return result2;
    }
  };

  return (
    <>
      <div className="lg:pl-40">
        <Search
          array={allBookmarks}
          update={update}
          setUpdate={setUpdate}
          userBookmarks={userBookmarks}
          loggedIn={loggedIn}
          width={width}
        />

        {search ? (
          ""
        ) : (
          <>
            <h2 className="content-heading text-white">Bookmarked shows</h2>
            <div className="p-3 grid grid-cols-2 md:grid-cols:3 lg:grid-cols-4">
              {bookmarkedContent("TV Series")}
            </div>
            <h2 className="content-heading text-white">Bookmarked movies</h2>
            <div className="p-3 grid grid-cols-2 md:grid-cols:3 lg:grid-cols-4">
              {bookmarkedContent("Movie")}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Bookmarks;
