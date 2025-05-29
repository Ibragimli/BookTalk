let currentAudio = null;
let currentBtn = null;
let currentTimeText = null;
let currentVolume = null;
let currentDuration = null;
let updateInterval = null;

document.querySelectorAll(".readerExample").forEach((example) => {
  const playBtn = example.querySelector(".audioBtn");
  const playIcon = example.querySelector(".playIcon");
  const timeText = example.querySelector(".timeText");
  const volumeControl = example.querySelector(".volumeControl");
  const audioSrc = example.dataset.audio;
  const duration = example.dataset.duration;
  const audio = new Audio(audioSrc);
  audio.preload = "auto";

  playIcon.addEventListener("click", () => {
    // Əvvəlki audio varsa və fərqlidirsə - dayandır
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      if (currentBtn) currentBtn.src = "./assets/icons/play.svg";
      if (currentTimeText && currentDuration) {
        currentTimeText.innerHTML = `${currentDuration} dəqiqə`;
      }
      if (currentVolume) currentVolume.style.display = "none";
      clearInterval(updateInterval);
    }

    // Bu audio dayandırılırsa
    if (!audio.paused) {
      audio.pause();
      playBtn.src = "./assets/icons/play.svg";
      timeText.innerHTML = `${duration} dəqiqə`;
      volumeControl.style.display = "none";
      clearInterval(updateInterval);
      return;
    }

    // Əks halda səsləndir
    audio
      .play()
      .then(() => {
        playBtn.src = "./assets/icons/pause.svg";
        timeText.innerHTML = `<span class="currentTime">0:00</span> / <span>${duration}</span>`;
        volumeControl.style.display = "inline-block";

        // Vaxt yenilənməsi
        updateInterval = setInterval(() => {
          const current = audio.currentTime;
          const minutes = Math.floor(current / 60);
          const seconds = Math.floor(current % 60)
            .toString()
            .padStart(2, "0");
          const currentTimeSpan = timeText.querySelector(".currentTime");
          if (currentTimeSpan) {
            currentTimeSpan.textContent = `${minutes}:${seconds}`;
          }
        }, 500);

        // Global dəyişənləri yenilə
        currentAudio = audio;
        currentBtn = playBtn;
        currentTimeText = timeText;
        currentVolume = volumeControl;
        currentDuration = duration;
      })
      .catch((err) => {
        console.error("Audio play error:", err);
      });
  });

  // Həcm tənzimləmə
  volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
  });

  // Audio bitdikdə sıfırla
  audio.addEventListener("ended", () => {
    playBtn.src = "./assets/icons/play.svg";
    timeText.innerHTML = `${duration} dəqiqə`;
    volumeControl.style.display = "none";
    clearInterval(updateInterval);
    currentAudio = null;
    currentBtn = null;
    currentTimeText = null;
    currentVolume = null;
    currentDuration = null;
  });
});
