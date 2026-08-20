const menuButton = document.querySelector("[data-mobile-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const navInner = document.querySelector(".nav-inner");
const desktopCv = document.querySelector(".nav-inner > .nav-cv:not(.mobile-nav-cv)");
const mobileNavCv = mobileMenu?.querySelector(".mobile-nav-cv");
const mobileBreakpoint = window.matchMedia("(max-width: 760px)");

function applyNavigationLayout() {
  if (!mobileMenu || !navInner || !menuButton) return;

  const mobile = mobileBreakpoint.matches;

  if (mobile) {
    navInner.style.gridTemplateColumns = "minmax(0, 1fr) auto";
    navInner.style.gridTemplateAreas = '"brand menu" "nav nav"';
    navInner.style.gap = "0 12px";
    navInner.style.paddingBlock = "8px";

    menuButton.style.display = "block";
    if (desktopCv) desktopCv.style.display = "none";

    mobileMenu.style.gridArea = "nav";
    mobileMenu.style.gridColumn = "1 / -1";
    mobileMenu.style.justifySelf = "stretch";
    mobileMenu.style.width = "100%";
    mobileMenu.style.minWidth = "0";
    mobileMenu.style.maxWidth = "100%";
    mobileMenu.style.margin = "0";
    mobileMenu.style.padding = "8px 0 4px";
    mobileMenu.style.border = "0";
    mobileMenu.style.borderRadius = "0";
    mobileMenu.style.background = "transparent";
    mobileMenu.style.boxShadow = "none";
    mobileMenu.style.boxSizing = "border-box";

    mobileMenu.querySelectorAll("a:not(.mobile-nav-cv)").forEach((link) => {
      link.style.gridArea = "auto";
      link.style.order = "1";
      link.style.width = "100%";
      link.style.minWidth = "0";
      link.style.maxWidth = "100%";
      link.style.boxSizing = "border-box";
    });

    if (mobileNavCv) {
      mobileNavCv.style.gridArea = "auto";
      mobileNavCv.style.gridColumn = "1 / -1";
      mobileNavCv.style.order = "2";
      mobileNavCv.style.width = "100%";
      mobileNavCv.style.maxWidth = "100%";
      mobileNavCv.style.boxSizing = "border-box";
    }
    return;
  }

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Navigation öffnen");
  mobileMenu.dataset.open = "false";

  navInner.style.gridTemplateColumns = "auto 1fr auto";
  navInner.style.gridTemplateAreas = '"brand nav cv"';
  navInner.style.gap = "30px";
  navInner.style.paddingBlock = "0";

  menuButton.style.display = "none";
  if (desktopCv) desktopCv.style.display = "inline-flex";

  mobileMenu.style.gridArea = "nav";
  mobileMenu.style.gridColumn = "auto";
  mobileMenu.style.justifySelf = "stretch";
  mobileMenu.style.display = "flex";
  mobileMenu.style.width = "auto";
  mobileMenu.style.minWidth = "0";
  mobileMenu.style.maxWidth = "none";
  mobileMenu.style.margin = "0";
  mobileMenu.style.padding = "0";
  mobileMenu.style.border = "0";
  mobileMenu.style.borderRadius = "0";
  mobileMenu.style.background = "transparent";
  mobileMenu.style.boxShadow = "none";
  mobileMenu.style.gap = "clamp(16px, 2.3vw, 30px)";

  mobileMenu.querySelectorAll("a:not(.mobile-nav-cv)").forEach((link) => {
    link.style.gridArea = "auto";
    link.style.order = "initial";
    link.style.width = "auto";
    link.style.minWidth = "0";
    link.style.maxWidth = "none";
    link.style.minHeight = "0";
    link.style.padding = "0";
    link.style.border = "0";
    link.style.borderRadius = "0";
    link.style.background = "transparent";
    link.style.color = "var(--muted)";
    link.style.fontSize = ".76rem";
    link.style.fontWeight = "780";
  });

  if (mobileNavCv) mobileNavCv.style.display = "none";
}

function setMenuOpen(open) {
  if (!menuButton || !mobileMenu) return;
  const shouldOpen = mobileBreakpoint.matches && open;
  menuButton.setAttribute("aria-expanded", String(shouldOpen));
  menuButton.setAttribute("aria-label", shouldOpen ? "Navigation schließen" : "Navigation öffnen");
  mobileMenu.dataset.open = String(shouldOpen);
}

applyNavigationLayout();

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

mobileBreakpoint.addEventListener("change", () => {
  applyNavigationLayout();
});

window.addEventListener("resize", applyNavigationLayout, { passive: true });

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
  applyNavigationLayout();
  if (!location.hash) return;
  requestAnimationFrame(() => {
    history.replaceState(null, "", location.pathname + location.search);
  });
});
