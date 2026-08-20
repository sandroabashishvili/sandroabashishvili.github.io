const menuButton = document.querySelector("[data-mobile-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const mobileNavCv = mobileMenu?.querySelector(".mobile-nav-cv");
const mobileBreakpoint = window.matchMedia("(max-width: 1080px)");

function normalizeMobileMenuLayout() {
  if (!mobileMenu) return;

  mobileMenu.style.gridColumn = "1 / -1";
  mobileMenu.style.justifySelf = "stretch";
  mobileMenu.style.width = "auto";
  mobileMenu.style.minWidth = "0";
  mobileMenu.style.maxWidth = "none";
  mobileMenu.style.marginLeft = "0";
  mobileMenu.style.marginRight = "0";
  mobileMenu.style.boxSizing = "border-box";

  if (mobileNavCv) {
    mobileNavCv.style.gridArea = "auto";
    mobileNavCv.style.gridColumn = "1 / -1";
    mobileNavCv.style.order = "2";
    mobileNavCv.style.width = "100%";
    mobileNavCv.style.maxWidth = "100%";
    mobileNavCv.style.boxSizing = "border-box";
  }

  mobileMenu.querySelectorAll("a:not(.mobile-nav-cv)").forEach((link) => {
    link.style.gridArea = "auto";
    link.style.order = "1";
    link.style.width = "100%";
    link.style.minWidth = "0";
    link.style.maxWidth = "100%";
    link.style.boxSizing = "border-box";
  });
}

function setMenuOpen(open) {
  if (!menuButton || !mobileMenu) return;
  if (open && mobileBreakpoint.matches) normalizeMobileMenuLayout();
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Navigation schließen" : "Navigation öffnen");
  mobileMenu.dataset.open = String(open);
}

normalizeMobileMenuLayout();

menuButton?.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileMenu?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

document.addEventListener("click", (event) => {
  if (!menuButton || !mobileMenu) return;
  if (menuButton.getAttribute("aria-expanded") !== "true") return;
  if (mobileMenu.contains(event.target) || menuButton.contains(event.target)) return;
  setMenuOpen(false);
});

mobileBreakpoint.addEventListener("change", (event) => {
  normalizeMobileMenuLayout();
  if (!event.matches) setMenuOpen(false);
});

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || href === "#") return;
  const target = document.querySelector(href);
  if (!target) return;

  event.preventDefault();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  history.replaceState(null, "", location.pathname + location.search);
});

window.addEventListener("load", () => {
  if (!location.hash) return;
  requestAnimationFrame(() => {
    history.replaceState(null, "", location.pathname + location.search);
  });
});
