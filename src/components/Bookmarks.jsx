import { useOutletContext } from "react-router";
import Search from "./Search";
import Card from "./Card";

function Bookmarks() {
  const { contents, userBookmarks, loggedIn, update, setUpdate, width } = useOutletContext();

  const allBookmarks = contents.filter((content) => {
    const isBookmarked = userBookmarks.find(
      (bookmark) =>
        bookmark.contentsId == content.contentsId && bookmark.userId == loggedIn
    );
    return isBookmarked;
  });


  // const bookmarkedContent = (cat) => {
  //   const filtercond = cat
  //   const result = allBookmarks.filter((content) => content.category === filtercond);
  //   if (result.length === 0 && loggedIn) {
  //     return (
  //       <p className="body-m text-white">
  //         You do not have any bookmarks in this category
  //       </p>
  //     );
  //   } else {
  //     result.map((item) => {
  //       return (
  //         <div key={item.contentsId}>
  //           <Card
  //             item={item}
  //             key={item.contentsId}
  //             update={update}
  //             setUpdate={setUpdate}
  //             userBookmarks={userBookmarks}
  //             loggedIn={loggedIn}
  //             width={width}
  //           />
  //         </div>
  //       );
  //     });
  //     return result;
  //   }
  // };

  return (
    <>
      <Search
        array={allBookmarks}
        update={update}
        setUpdate={setUpdate}
        userBookmarks={userBookmarks}
        loggedIn={loggedIn}
        width={width}
      />

      {/* {loggedIn ? (
        search? "" :
        <>
          <h1 className="content-heading text-white">Bookmarked shows</h1>
          <div className="p-3 grid grid-cols-2 md:grid-cols:3 lg:grid-cols-4">
            {bookmarkedContent("TV Series")}
          </div>
          <h1 className="content-heading text-white">Bookmarked movies</h1>
          <div className="p-3 grid grid-cols-2 md:grid-cols:3 lg:grid-cols-4">
            {bookmarkedContent("Movies")}
          </div>
        </>
      ) : (
        <h1 className="heading-l text-white">Please log in to use bookmark functionality</h1>
      )} */}
    </>
  );
}

export default Bookmarks;
