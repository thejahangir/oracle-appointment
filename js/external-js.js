document.addEventListener("DOMContentLoaded", () => {

    const selectedDateText = document.getElementById("selectedDateText");
    const timeSlotsContainer = document.getElementById("timeSlots");
    const skeletonContainer = document.getElementById("timeSlotSkeleton");
    const confirmBtn = document.getElementById("confirmBtn");
  
    const START_HOUR = 6;
    const END_HOUR = 18;
    const INTERVAL = 30;
    const UNAVAILABLE_SLOTS = [
      "07:00 AM",
      "09:30 AM",
      "01:00 PM",
      "04:30 PM"
    ];
  
    selectedDateText.textContent = "Select a date to view availability";
    confirmBtn.disabled = true;
  
    skeletonContainer.classList.remove("d-none");
    timeSlotsContainer.classList.add("d-none");
  
    renderSkeletonSlots();
  
    flatpickr("#calendar", {
      inline: true,
      minDate: "today",
      disable: ["2026-01-10", "2026-01-15"],
  
      onReady(_, __, instance) {
        instance.calendarContainer
          .querySelector(".flatpickr-day.today")
          ?.classList.remove("selected");
      },
  
      onChange(selectedDates) {
        if (!selectedDates.length) return;
  
        selectedDateText.textContent =
          selectedDates[0].toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
          });
  
        confirmBtn.disabled = true;
        skeletonContainer.classList.remove("d-none");
        timeSlotsContainer.classList.add("d-none");
  
        setTimeout(() => {
          renderTimeSlots();
          skeletonContainer.classList.add("d-none");
          timeSlotsContainer.classList.remove("d-none");
        }, 300);
      }
    });
  
    function renderSkeletonSlots() {
      skeletonContainer.innerHTML = "";
  
      const totalSlots =
        ((END_HOUR - START_HOUR) * 60) / INTERVAL + 1;
  
      for (let i = 0; i < totalSlots; i++) {
        const skeleton = document.createElement("div");
        skeleton.className = "slot-skeleton";
        skeletonContainer.appendChild(skeleton);
      }
    }
  
    function renderTimeSlots() {
      timeSlotsContainer.innerHTML = "";
  
      for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
        for (let minute = 0; minute < 60; minute += INTERVAL) {
          if (hour === END_HOUR && minute !== 0) continue;
  
          const label = formatTime(hour, minute);
          const button = document.createElement("button");
  
          button.className = "time-slot";
          button.textContent = label;
  
          if (UNAVAILABLE_SLOTS.includes(label)) {
            button.classList.add("disabled");
            button.disabled = true;
          } else {
            button.addEventListener("click", () => {
              document
                .querySelectorAll(".time-slot.active")
                .forEach(el => el.classList.remove("active"));
  
              button.classList.add("active");
              confirmBtn.disabled = false;
            });
          }
  
          timeSlotsContainer.appendChild(button);
        }
      }
    }
  
    function formatTime(hour, minute) {
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      return `${displayHour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")} ${period}`;
    }
  
  });
  