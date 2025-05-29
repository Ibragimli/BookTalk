let isPlaying = false;

function toggleVideo() {
  const video = document.getElementById("readerVideo");
  const preview = document.getElementById("videoPreview");

  if (!isPlaying) {
    video
      .play()
      .then(() => {
        video.setAttribute("controls", "controls");
        preview.style.display = "none";
        isPlaying = true;
      })
      .catch((error) => {
        console.error("Video Error:", error);
      });
  } else {
    video.pause();
    video.removeAttribute("controls");
    preview.style.display = "flex";
    isPlaying = false;
  }
}
