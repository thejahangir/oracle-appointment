/* =====================================================
   DOM HELPERS
===================================================== */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => scope.querySelectorAll(selector);

/* =====================================================
   SIDEBAR CONTROLLER
===================================================== */
(() => {
  const toggleBtn = $("#toggleSidebar");
  const sidebar = $("#sidebar");
  const backdrop = $("#sidebarBackdrop");

  if (!toggleBtn || !sidebar) return;

  const icon = toggleBtn.querySelector("i");

  const isExpanded = () => sidebar.classList.contains("expanded");

  const open = () => {
    sidebar.classList.add("expanded");
    sidebar.classList.remove("collapsed");
    icon?.classList.replace("bi-list", "bi-x-lg");
    backdrop?.classList.add("show");
  };

  const close = () => {
    sidebar.classList.remove("expanded");
    sidebar.classList.add("collapsed");
    icon?.classList.replace("bi-x-lg", "bi-list");
    backdrop?.classList.remove("show");
  };

  toggleBtn.addEventListener("click", () => {
    isExpanded() ? close() : open();
  });

  backdrop?.addEventListener("click", close);

  /* Responsive safety */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 991) {
      backdrop?.classList.remove("show");
    } else {
      close();
    }
  });
})();

/* =====================================================
   SUBMENU CONTROLLER
===================================================== */
(() => {
  const submenuTriggers = $$(".has-submenu");

  if (!submenuTriggers.length) return;

  submenuTriggers.forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();

      const key = trigger.dataset.submenu;
      const submenu = $(`#submenu-${key}`);

      if (!submenu) return;

      trigger.classList.toggle("open");
      submenu.classList.toggle("open");
    });
  });
})();

/* =====================================================
   USER MENU DROPDOWN
===================================================== */
(() => {
  const userMenuBtn = $("#userMenuBtn");
  const userDropdown = $("#userDropdown");

  if (!userMenuBtn || !userDropdown) return;

  userMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    userMenuBtn.classList.toggle("open");
    userDropdown.classList.toggle("show");
  });

  /* Close on outside click */
  document.addEventListener("click", () => {
    userMenuBtn.classList.remove("open");
    userDropdown.classList.remove("show");
  });
})();
/* =====================================================
   FILTER RESET ENABLE / DISABLE
===================================================== */
(() => {
    const resetBtn = document.getElementById("resetFiltersBtn");
    const filters = document.querySelectorAll(".filter-select");
  
    if (!resetBtn || !filters.length) return;
  
    const defaultValues = Array.from(filters).map(
      select => select.selectedIndex
    );
  
    const checkFiltersChanged = () => {
      const isChanged = Array.from(filters).some(
        (select, index) => select.selectedIndex !== defaultValues[index]
      );
  
      resetBtn.disabled = !isChanged;
    };
  
    // Listen to filter changes
    filters.forEach(select => {
      select.addEventListener("change", checkFiltersChanged);
    });
  
    // Reset filters click
    resetBtn.addEventListener("click", () => {
      filters.forEach((select, index) => {
        select.selectedIndex = defaultValues[index];
      });
  
      resetBtn.disabled = true;
    });
  })();
  