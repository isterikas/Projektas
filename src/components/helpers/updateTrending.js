import { getAllData } from "./get";
import { putData } from "./update";

export async function updateTrending() {
  try {
   
    const contents = await getAllData("contents");
    const userBookmarks = await getAllData("userBookmarks");
    const counts = {};

    // Sumuoja  contentsId 
    // userBookmarks.forEach((bookmark) => {
    //   bookmark.contentsId.forEach((id) => {
    //     counts[id] = (counts[id] || 0) + 1;
    //   });
    // });

    userBookmarks.forEach((bookmark) => {
      const id = bookmark.contentsId.toString();
      counts[id] = (counts[id] || 0) + 1;
    });

    // Update latestTrending 
    contents.forEach((content) => {
      const id = content.contentsId.toString();
      content.latestTrending = counts[id] || 0;
    });

    // Atnaujinti duomenis data.json
    await Promise.all(
      contents.map((content) => putData(content.contentsId, content))
    );

    console.log("Update completed successfully.");
    return contents;
  } catch (error) {
    console.error("Error updating trending contents:", error);
    throw error;
  }
}
