import "../css/newTab.css";
import fetchBookmarks from "./newTab/fetchBookmarks";
import deleteBookmark from "./newTab/deleteBookmark";
import categoryCollapse from "./newTab/categoryCollapse";

fetchBookmarks();
categoryCollapse();
deleteBookmark();

// get messages
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    // message from background.js -> new bookmark saved
    if (request.message == "reload") {
      fetchBookmarks();
      deleteBookmark();
    }
});