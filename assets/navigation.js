const menuButton = document.querySelector("[data-mobile-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

function setMenuOpen(open) {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Navigation schließen" : "Navigation öffnen");
  mobileMenu.dataset.open = String(open);
}

menuButton?.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

window.matchMedia("(min-width: 1081px)").addEventListener("change", (event) => {
  if (event.matches) setMenuOpen(false);
});

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const target = document.querySelector(link.getAttribute("href"));
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
