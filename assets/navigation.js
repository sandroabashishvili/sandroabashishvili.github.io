const menuButton = document.querySelector("[data-mobile-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const menuHome = mobileMenu?.parentElement || null;
const menuNextSibling = mobileMenu?.nextSibling || null;
const mobileBreakpoint = window.matchMedia("(max-width: 1080px)");

function restoreMenuHome() {
  if (!mobileMenu || !menuHome || mobileMenu.parentElement === menuHome) return;
  if (menuNextSibling && menuNextSibling.parentNode === menuHome) {
    menuHome.insertBefore(mobileMenu, menuNextSibling);
  } else {
    menuHome.appendChild(mobileMenu);
  }
  mobileMenu.classList.remove("menu-portal");
  mobileMenu.style.removeProperty("top");
  mobileMenu.style.removeProperty("left");
  mobileMenu.style.removeProperty("right");
}

function positionPortalMenu() {
  if (!menuButton || !mobileMenu || !mobileBreakpoint.matches) return;
  const header = menuButton.closest(".topbar");
  const rect = header?.getBoundingClientRect();
  const gutter = window.innerWidth <= 760 ? 12 : 16;
  mobileMenu.style.top = `${Math.max(0, rect?.bottom ?? 64) + 1}px`;
  mobileMenu.style.left = `${gutter}px`;
  mobileMenu.style.right = `${gutter}px`;
}

function moveMenuToViewport() {
  if (!mobileMenu || !mobileBreakpoint.matches) return;
  if (mobileMenu.parentElement !== document.body) document.body.appendChild(mobileMenu);
  mobileMenu.classList.add("menu-portal");
  positionPortalMenu();
}

function setMenuOpen(open) {
  if (!menuButton || !mobileMenu) return;

  if (open && mobileBreakpoint.matches) moveMenuToViewport();

  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Navigation schließen" : "Navigation öffnen");
  mobileMenu.dataset.open = String(open);
  document.body.classList.toggle("nav-open", open);

  if (!open) restoreMenuHome();
}

menuButton?.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileMenu?.addEventListener("click", (event) => {
  if (event.target.closest("a, button")) setMenuOpen(false);
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

window.addEventListener("resize", () => {
  if (menuButton?.getAttribute("aria-expanded") === "true") positionPortalMenu();
});

window.addEventListener("scroll", () => {
  if (menuButton?.getAttribute("aria-expanded") === "true") positionPortalMenu();
}, { passive: true });

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
