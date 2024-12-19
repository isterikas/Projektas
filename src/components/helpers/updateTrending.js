import { getAllData } from "./get";
import { patchData } from "./update";

async function updateContents(contents) {
  try {
    const patchPromises = contents.map((content) => {
      return patchData("contents", content.id.toString(), content);
    });

    // console.log(await Promise.all(patchPromises));
    return contents;
  } catch (error) {
    console.error("Error updating trending contents:", error);
    throw error;
  }
}

export async function updateTrending() {
  try {
    const contents = await getAllData("contents");
    const userBookmarks = await getAllData("userBookmarks");
    const counts = {};

    userBookmarks.forEach((bookmark) => {
      const id = bookmark.contentsId.toString();
      counts[id] = (counts[id] || 0) + 1;
    });

    // Update latestTrending
    contents.forEach((content) => {
      const id = content.contentsId.toString();
      content.latestTrending = counts[id] || 0;
    });

    await updateContents(contents);

    return contents;
  } catch (error) {
    console.error("Error updating trending contents:", error);
    throw error;
  }
}
