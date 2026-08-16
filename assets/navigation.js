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

/* Portfolio polish: keep the primary navigation focused on portfolio content,
   move legal/privacy controls to the footer and replace project numbers with icons. */
(function polishPortfolioChrome() {
  const mainNav = document.querySelector("#main-navigation");
  const footer = document.querySelector("footer");

  if (mainNav && footer) {
    const privacyLink = Array.from(mainNav.querySelectorAll("a")).find((link) =>
      link.getAttribute("href")?.includes("datenschutz")
    );
    const consentButton = mainNav.querySelector("[data-consent-settings]");

    if (privacyLink || consentButton) {
      const legalNav = document.createElement("nav");
      legalNav.className = "footer-legal-links";
      legalNav.setAttribute("aria-label", "Datenschutz und Einstellungen");

      if (privacyLink) legalNav.appendChild(privacyLink);
      if (consentButton) legalNav.appendChild(consentButton);

      const backToTop = footer.querySelector('a[href="#start"]');
      if (backToTop) footer.insertBefore(legalNav, backToTop);
      else footer.appendChild(legalNav);
    }
  }

  const iconByProject = {
    "Georgien Atlas": `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8"></circle>
        <path d="M4.5 12h15M12 4c2 2.2 3 4.9 3 8s-1 5.8-3 8c-2-2.2-3-4.9-3-8s1-5.8 3-8Z"></path>
      </svg>`,
    "Mr.B": `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l1.25 4.1L17 9l-3.75 1.9L12 15l-1.25-4.1L7 9l3.75-1.9L12 3Z"></path>
        <path d="M18.5 14l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z"></path>
      </svg>`,
    "Angeln in Georgien": `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 12c3.2-3.4 7.1-4.7 11.5-3.8L20 5v14l-4.5-3.2C11.1 16.7 7.2 15.4 4 12Z"></path>
        <circle cx="13.7" cy="10.7" r=".8"></circle>
      </svg>`
  };

  document.querySelectorAll(".project-list a").forEach((link) => {
    const title = link.querySelector("strong")?.textContent.trim();
    const marker = link.querySelector(":scope > span");
    if (!title || !marker || !iconByProject[title]) return;
    marker.className = "project-list-icon";
    marker.innerHTML = iconByProject[title];
  });

  const style = document.createElement("style");
  style.dataset.portfolioPolish = "true";
  style.textContent = `
    /* Header: clean text navigation; CV remains the only button-style CTA. */
    .topbar nav {
      gap: clamp(18px, 2.4vw, 32px);
    }

    .topbar nav a {
      position: relative;
      padding: 8px 0;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      transition: color 180ms ease;
    }

    .topbar nav a::after {
      position: absolute;
      right: 100%;
      bottom: 2px;
      left: 0;
      height: 2px;
      border-radius: 999px;
      background: var(--green);
      content: "";
      transition: right 180ms ease;
    }

    .topbar nav a:hover::after,
    .topbar nav a:focus-visible::after {
      right: 0;
    }

    .brand span {
      width: 36px;
      height: 36px;
      border: 1px solid color-mix(in srgb, var(--green) 30%, transparent);
      border-radius: 11px;
      background: var(--lime);
      color: #10231f;
      box-shadow: 0 6px 18px rgb(16 23 20 / 8%);
      letter-spacing: -0.04em;
    }

    .brand strong {
      font-weight: 800;
      letter-spacing: -0.015em;
    }

    /* Footer legal area: intentionally secondary to portfolio navigation. */
    footer {
      grid-template-columns: minmax(0, 1fr) auto auto auto;
    }

    .footer-legal-links {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }

    .footer-legal-links a,
    .footer-legal-links button {
      margin: 0;
      padding: 0;
      border: 0;
      border-radius: 0;
      background: transparent;
      color: var(--muted);
      font: inherit;
      font-size: .72rem;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
    }

    .footer-legal-links a:hover,
    .footer-legal-links a:focus-visible,
    .footer-legal-links button:hover,
    .footer-legal-links button:focus-visible {
      color: var(--ink);
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    /* Small project icons replace document-style numbering. */
    .project-list-icon {
      display: grid !important;
      width: 38px;
      height: 38px;
      place-items: center;
      flex: 0 0 38px;
      border: 1px solid color-mix(in srgb, var(--green) 24%, var(--line));
      border-radius: 12px;
      background: color-mix(in srgb, var(--green) 6%, var(--surface));
      color: var(--green) !important;
    }

    .project-list-icon svg {
      width: 19px;
      height: 19px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.7;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* The design follows the browser/OS theme; no manual theme state is stored. */
    @media (prefers-color-scheme: dark) {
      .brand span {
        border-color: rgb(216 245 106 / 24%);
        background: #d8f56a;
        color: #0d1815;
        box-shadow: 0 8px 22px rgb(0 0 0 / 20%);
      }

      .topbar nav a::after {
        background: var(--mint);
      }

      .project-list-icon {
        border-color: rgb(141 224 187 / 22%);
        background: rgb(141 224 187 / 7%);
        color: var(--mint) !important;
      }
    }

    @media (max-width: 1080px) {
      .topbar nav a {
        padding: 10px 0;
      }

      .topbar nav a::after {
        display: none;
      }

      footer {
        grid-template-columns: 1fr auto;
      }

      .footer-legal-links {
        justify-content: flex-start;
        flex-wrap: wrap;
      }
    }

    @media (max-width: 720px) {
      .brand strong {
        font-size: .82rem;
      }

      footer {
        display: flex;
      }

      .footer-legal-links {
        order: 3;
        gap: 10px 16px;
      }
    }
  `;
  document.head.appendChild(style);
})();
