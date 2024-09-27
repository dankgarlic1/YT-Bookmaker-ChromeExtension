(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  let currentVideoBookmarks = [];
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    console.log("Message received in content script:", obj);
    const { type, value, videoId } = obj;
    if (type == "NEW") {
      currentVideo = videoId;
      console.log("New video loaded:", currentVideo);
      newVideoLoaded();
    }
  });
  const newVideoLoaded = () => {
    const bookmarkBtnExists =
      document.getElementsByClassName("bookmark-btn")[0];
    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");
      bookmarkBtn.src = chrome.runtime.getUrl("/assets/bookmark.png");
      bookmarkBtn.className = "ytp-button " + "bookmark-btn";
      bookmarkBtn.title = "Click to bookmark current timestamp";
      youtubeLeftControls =
        document.getElementsByClassName("ytp-left-controls")[0];
      youtubePlayer = document.getElementsByClassName("video-stream")[0];
      youtubeLeftControls.appendChild(bookmarkBtn);
      bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
    }
  };
  newVideoLoaded();
})();
