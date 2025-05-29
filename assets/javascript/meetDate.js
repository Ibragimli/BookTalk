document.addEventListener("DOMContentLoaded", () => {
  const readerName = document.getElementById("readerName").innerText.trim();
  const hourlyPrice = 45;

  const summaryReaderName = document.getElementById("summaryReaderName");
  const summaryDuration = document.getElementById("summaryDuration");
  const summaryDate = document.getElementById("summaryDate");
  const summaryTime = document.getElementById("summaryTime");
  const summaryLocation = document.getElementById("summaryLocation");
  const summaryTotal = document.getElementById("summaryTotal");
  const proceedButton = document.getElementById("proceedButton");

  summaryReaderName.textContent = readerName;

  const durationInputs = document.querySelectorAll(
    'input[name="selectedDuration"]'
  );
  const dayInputs = document.querySelectorAll('input[name="selectedDay"]');
  const timeInputs = document.querySelectorAll('input[name="selectedTime"]');
  const locationInputs = document.querySelectorAll(
    'input[name="selectedLocation"]'
  );

  const locationPriceMap = {
    kitabxana: 0,
    kofesop: 5,
    onlayn: -0.1,
  };

  const monthNames = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "İyun",
    "İyul",
    "Avqust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];

  function getCorrectMonth(selectedDayNumber) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const selectedDateThisMonth = new Date(
      currentYear,
      currentMonth,
      selectedDayNumber
    );
    const today = new Date(currentYear, currentMonth, now.getDate());

    if (selectedDateThisMonth < today) {
      let nextMonth = currentMonth + 1;
      let nextYear = currentYear;
      if (nextMonth > 11) {
        nextMonth = 0;
        nextYear++;
      }
      return { monthName: monthNames[nextMonth], year: nextYear };
    } else {
      return { monthName: monthNames[currentMonth], year: currentYear };
    }
  }

  function updateProgressBar(selected) {
    let progress = 22;
    if (selected.day) progress = 44;
    if (selected.time) progress = 66;
    if (selected.duration) progress = 86;
    if (selected.location) progress = 101;

    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    // Progress steps
    document.querySelectorAll(".progress-step").forEach((step, index) => {
      step.classList.remove("active");
    });

    if (selected.day) document.getElementById("step1").classList.add("active");
    if (selected.time) document.getElementById("step2").classList.add("active");
    if (selected.duration)
      document.getElementById("step3").classList.add("active");
    if (selected.location)
      document.getElementById("step4").classList.add("active");

    if (progress === 100)
      document.getElementById("step5").classList.add("active");
  }

  function updateSummary() {
    const selectedDurationInput = Array.from(durationInputs).find(
      (i) => i.checked
    );
    const selectedDayInput = Array.from(dayInputs).find((i) => i.checked);
    const selectedTimeInput = Array.from(timeInputs).find((i) => i.checked);
    const selectedLocationInput = Array.from(locationInputs).find(
      (i) => i.checked
    );

    // Duration
    let durationText = "-";
    let durationPrice = 0;
    if (selectedDurationInput) {
      const label = selectedDurationInput.nextElementSibling;
      durationText = label.querySelector(".duration").innerText;
      durationPrice = parseInt(selectedDurationInput.id, 10);
    }
    summaryDuration.textContent = durationText;

    // Day & Month
    let dayText = "-";
    if (selectedDayInput) {
      const label = selectedDayInput.nextElementSibling;
      let selectedDayNum = parseInt(label.innerText.trim(), 10);
      const { monthName } = getCorrectMonth(selectedDayNum);
      dayText = `${selectedDayNum} ${monthName}`;
    }
    summaryDate.textContent = dayText;

    // Time
    let timeText = "-";
    if (selectedTimeInput) {
      const label = selectedTimeInput.nextElementSibling;
      timeText = label.innerText;
    }
    summaryTime.textContent = timeText;

    // Location
    let locationText = "-";
    let priceModifier = 0;
    if (selectedLocationInput) {
      const label = selectedLocationInput.nextElementSibling;
      locationText = label.querySelector(".locationTitle").innerText;
      priceModifier = locationPriceMap[selectedLocationInput.id] || 0;
    }
    summaryLocation.textContent = locationText;

    // Total Price
    let totalPrice = durationPrice;
    if (priceModifier < 0) {
      totalPrice = Math.round(totalPrice * (1 + priceModifier));
    } else {
      totalPrice += priceModifier;
    }
    summaryTotal.textContent = totalPrice > 0 ? `${totalPrice} AZN` : "0 AZN";

    const selected = {
      day: !!selectedDayInput,
      time: !!selectedTimeInput,
      duration: !!selectedDurationInput,
      location: !!selectedLocationInput,
    };

    updateProgressBar(selected);
  }

  [...durationInputs, ...dayInputs, ...timeInputs, ...locationInputs].forEach(
    (input) => {
      input.addEventListener("change", updateSummary);
    }
  );

  proceedButton.addEventListener("click", (e) => {
    const selectedDurationInput = Array.from(durationInputs).find(
      (i) => i.checked
    );
    const selectedDayInput = Array.from(dayInputs).find((i) => i.checked);
    const selectedTimeInput = Array.from(timeInputs).find((i) => i.checked);
    const selectedLocationInput = Array.from(locationInputs).find(
      (i) => i.checked
    );

    if (
      !selectedDurationInput ||
      !selectedDayInput ||
      !selectedTimeInput ||
      !selectedLocationInput
    ) {
      e.preventDefault();
      alert("Zəhmət olmasa bütün seçimləri tamamlayın.");
    }
  });

  updateSummary();
});
