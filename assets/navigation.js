const menuButton = document.querySelector("[data-mobile-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const mobileBreakpoint = window.matchMedia("(max-width: 760px)");

function setMenuOpen(open) {
  if (!menuButton || !mobileMenu) return;
  const shouldOpen = mobileBreakpoint.matches && open;
  menuButton.setAttribute("aria-expanded", String(shouldOpen));
  menuButton.setAttribute("aria-label", shouldOpen ? "Navigation schließen" : "Navigation öffnen");
  mobileMenu.dataset.open = String(shouldOpen);
}

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
