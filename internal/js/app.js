document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------------
     FILTERING LOGIC (EVENT LIST)
  ------------------------------------ */
  const filterPills = document.querySelectorAll(".filter-pill");
  const events = document.querySelectorAll(".event-item");
  const skeleton = document.getElementById("skeleton-container");

  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      const filter = pill.dataset.filter;
      let visibleCount = 0;

      events.forEach(event => {
        const status = event.dataset.status;

        if (filter === "all" || status === filter) {
          event.classList.remove("is-collapsed");
          void event.offsetWidth;
          event.classList.remove("is-hidden");
          visibleCount++;
        } else {
          event.classList.add("is-hidden");
          setTimeout(() => event.classList.add("is-collapsed"), 250);
        }
      });

      skeleton?.classList.toggle("d-none", visibleCount !== 0);
    });
  });

  /* ------------------------------------
     DELETE CONFIRM MODAL
  ------------------------------------ */
  let cardToDelete = null;
  const modalElement = document.getElementById("deleteConfirmModal");

  if (modalElement) {
    const deleteModal = new bootstrap.Modal(modalElement);

    document.body.addEventListener("click", e => {
      const deleteBtn = e.target.closest(".delete-btn");
      if (!deleteBtn) return;

      cardToDelete = deleteBtn.closest(".event-item");
      deleteModal.show();
    });

    document.getElementById("confirmDeleteBtn")
      ?.addEventListener("click", () => {
        if (!cardToDelete) return;

        cardToDelete.classList.add("is-hidden");
        setTimeout(() => cardToDelete.remove(), 250);
        deleteModal.hide();
        cardToDelete = null;
      });
  }

  /* ------------------------------------
     SIDEBAR TOGGLE
  ------------------------------------ */
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.getElementById("sidebarToggle");

  toggleBtn?.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  /* ------------------------------------
     NOTIFICATIONS
  ------------------------------------ */
  const notificationToggle = document.getElementById("notificationToggle");
  const notificationPanel = document.getElementById("notificationPanel");
  const userDropdown = document.querySelector(".user-dropdown .dropdown-menu");

  notificationToggle?.addEventListener("click", e => {
    e.stopPropagation();
    notificationPanel.classList.toggle("show");
    userDropdown?.classList.remove("show");
  });

  document.addEventListener("click", () => {
    notificationPanel?.classList.remove("show");
  });

  /* ------------------------------------
     CREATE EVENT NAVIGATION
  ------------------------------------ */
  document.getElementById("createEventBtn")
    ?.addEventListener("click", () => {
      window.location.href = "create-event.html";
    });

  /* ------------------------------------
     EVENT TYPE SELECTION (CREATE EVENT)
  ------------------------------------ */
  let selectedEventType = null;
  const continueBtn = document.getElementById("continueBtn");

  if (continueBtn) continueBtn.disabled = true;

  document.querySelectorAll(".event-type-card").forEach(card => {
    card.addEventListener("click", () => {
      document
        .querySelectorAll(".event-type-card")
        .forEach(c => c.classList.remove("active"));

      card.classList.add("active");
      selectedEventType = card.dataset.type;
      if (continueBtn) continueBtn.disabled = false;
    });
  });

  continueBtn?.addEventListener("click", () => {
    if (!selectedEventType) return;

    window.location.href =
      selectedEventType === "individual"
        ? "create-individual.html"
        : selectedEventType === "group"
        ? "create-group-event.html"
        : "create-roster.html";
  });

  /* ------------------------------------
     GENERIC PILL GROUP HANDLER
  ------------------------------------ */
  function initPillGroup(containerSelector) {
    document.querySelectorAll(containerSelector).forEach(container => {
      const pills = container.querySelectorAll(".pill");

      pills.forEach(pill => {
        pill.addEventListener("click", () => {
          pills.forEach(p => p.classList.remove("active"));
          pill.classList.add("active");
        });
      });
    });
  }

  initPillGroup(".duration-pills");
  initPillGroup(".location-pills");

  /* ------------------------------------
     PHYSICAL LOCATION ADDRESS TOGGLE
  ------------------------------------ */
  const physicalField = document.getElementById("physicalLocationField");

  document.querySelectorAll(".location-pills .pill").forEach(pill => {
    pill.addEventListener("click", () => {
      const location = pill.dataset.location;

      if (!physicalField) return;

      if (location === "physical") {
        physicalField.classList.remove("d-none");
        requestAnimationFrame(() => physicalField.classList.add("show"));
      } else {
        physicalField.classList.remove("show");
        setTimeout(() => physicalField.classList.add("d-none"), 160);
      }
    });
  });

  /* ------------------------------------
     BOOKING WINDOW SELECTION
  ------------------------------------ */
  const bookingOptions = document.querySelectorAll(".booking-option");

  bookingOptions.forEach(option => {
    option.addEventListener("click", () => {
      bookingOptions.forEach(o => o.classList.remove("active"));
      option.classList.add("active");
    });
  });

    /* ------------------------------------
     MANAGE GROUP – ENABLE MODIFY BUTTON
  ------------------------------------ */
  const groupSelect = document.getElementById("groupSelect");
  const modifyGroupBtn = document.getElementById("modifyGroupBtn");

  if (groupSelect && modifyGroupBtn) {
    // Ensure initial disabled state
    modifyGroupBtn.disabled = !groupSelect.value;

    groupSelect.addEventListener("change", () => {
      modifyGroupBtn.disabled = !groupSelect.value;
    });

    modifyGroupBtn.addEventListener("click", () => {
      if (!groupSelect.value) return;
      window.location.href = "edit-group.html";
    });
  }


});

document.getElementById("meetingSearch")?.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  console.log("Search:", value);
});

document.querySelectorAll(".page-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".page-btn")
      .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

