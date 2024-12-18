import { useEffect } from "react";
import { contents, userBookmarks } from "../../../data/data.json";
import { patchData } from "./update.js";

const updateContents = async (contents) => {
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
