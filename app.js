const screens = {
  start: document.querySelector('[data-screen="start"]'),
  menu: document.querySelector('[data-screen="menu"]'),
  section: document.querySelector('[data-screen="section"]')
};

const menuGrid = document.querySelector("#menuGrid");
const sectionNav = document.querySelector("#sectionNav");
const sectionTitle = document.querySelector("#sectionTitle");
const sectionHero = document.querySelector("#sectionHero");
const sectionContent = document.querySelector("#sectionContent");

let currentSection = "prevencion";
const navigationHistory = [];
const CONTENT_ORDER = [
  "prevencion",
  "conoce",
  "elementos",
  "panel",
  "gases",
  "camaras",
  "preparar",
  "demostracion",
  "finalizar",
  "incidencias",
  "mantenimiento",
  "documentos"
];

const WARNING_ICON = '<span class="warning-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><polygon points="12,2 23,22 1,22" fill="#d92d20" stroke="#7a271a" stroke-width="1.5" stroke-linejoin="round"/><rect x="11" y="9" width="2" height="7" fill="#ffffff"/><rect x="11" y="17" width="2" height="2" fill="#ffffff"/></svg></span>';

function isWarningItem(text) {
  return typeof text === "string" && /^\s*ATENCI[OÓ]N/i.test(text);
}

function stripWarningPrefix(text) {
  return text.replace(/^\s*ATENCI[OÓ]N\s*:?\s*/i, "");
}

function renderWarningRow(text) {
  return `<div class="warning-row" role="note"><div class="warning-row-icon">${WARNING_ICON}</div><div class="warning-row-body"><strong>ATENCIÓN</strong><span>${stripWarningPrefix(text)}</span></div></div>`;
}

function renderMixedItems(items) {
  const blocks = [];
  let bucket = [];
  const flush = () => {
    if (bucket.length) {
      blocks.push(`<ul class="plain-list">${bucket.map((t) => `<li>${t}</li>`).join("")}</ul>`);
      bucket = [];
    }
  };
  items.forEach((text) => {
    if (isWarningItem(text)) {
      flush();
      blocks.push(renderWarningRow(text));
    } else {
      bucket.push(text);
    }
  });
  flush();
  return blocks.join("");
}

function currentScreenName() {
  return Object.entries(screens).find(([, screen]) => !screen.classList.contains("hidden"))?.[0] || "start";
}

function currentState() {
  const screen = currentScreenName();
  return screen === "section" ? { screen, section: currentSection } : { screen };
}

function sameState(a, b) {
  return a.screen === b.screen && a.section === b.section;
}

function updateBackButtons() {
  document.querySelectorAll("[data-back]").forEach((button) => {
    button.disabled = navigationHistory.length === 0;
  });
}

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.add("hidden"));
  screens[name].classList.remove("hidden");
  updateBackButtons();
}

function pushCurrentState(nextState) {
  const previousState = currentState();
  if (!sameState(previousState, nextState)) {
    navigationHistory.push(previousState);
  }
}

function goToScreen(name) {
  pushCurrentState({ screen: name });
  showScreen(name);
}

function restoreState(state) {
  if (state.screen === "section" && state.section) {
    renderSection(state.section, false);
    return;
  }
  showScreen(state.screen);
  window.scrollTo(0, 0);
}

function goBack() {
  const previousState = navigationHistory.pop();
  if (!previousState) return;
  restoreState(previousState);
}

function sectionById(id) {
  return window.WTW_CONTENT.find((section) => section.id === id);
}

function orderedSections() {
  return CONTENT_ORDER.map(sectionById).filter(Boolean);
}

function renderMenu() {
  menuGrid.innerHTML = orderedSections().map((section) => `
    <article class="menu-item">
      <button class="menu-card ${section.urgent ? "menu-card-danger" : ""}" data-menu-toggle="${section.id}" aria-expanded="false">
        <span>${section.tag}</span>
        <strong>${section.title}</strong>
        <small>${section.subtitle}</small>
      </button>
      <div class="menu-inline-content" hidden>
        <div class="section-hero menu-section-hero">
          <div>
            <span class="section-tag">${section.tag}</span>
            <h2>${section.title}</h2>
            <p>${section.subtitle}</p>
          </div>
          <img src="${section.image}" alt="${section.title}" />
        </div>
        <div class="content-columns menu-content-columns">
          ${section.cards.map(renderCard).join("")}
        </div>
      </div>
    </article>
  `).join("");
}

function renderSectionNav() {
  sectionNav.innerHTML = orderedSections().map((section) => `
    <button class="${section.id === currentSection ? "active" : ""}" data-section="${section.id}">
      ${section.title}
    </button>
  `).join("");
}

function closeMenuItems() {
  menuGrid.querySelectorAll(".menu-item").forEach((menuItem) => {
    menuItem.classList.remove("open");
    menuItem.querySelector("[data-menu-toggle]").setAttribute("aria-expanded", "false");
    menuItem.querySelector(".menu-inline-content").hidden = true;
  });
}

function toggleMenuItem(item, forceOpen) {
  const menuToggle = item.querySelector("[data-menu-toggle]");
  const inlineContent = item.querySelector(".menu-inline-content");
  const willOpen = forceOpen ?? !item.classList.contains("open");
  closeMenuItems();
  item.classList.toggle("open", willOpen);
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  inlineContent.hidden = !willOpen;
  if (willOpen) {
    item.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function openMenuItemById(id) {
  const item = menuGrid.querySelector(`[data-menu-toggle="${id}"]`)?.closest(".menu-item");
  if (item) {
    toggleMenuItem(item, true);
  }
}

function renderElementsCard(card) {
  const buttons = card.items.map((item, index) => `
    <button class="element-button ${index === 0 ? "active" : ""}" data-element-index="${index}">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${item.name}</strong>
    </button>
  `).join("");

  const details = card.items.map((item, index) => `
    <div class="element-detail ${index === 0 ? "active" : ""}" data-element-detail="${index}">
      ${item.image ? `<figure class="element-photo"><img src="${item.image}" alt="${item.name}" /><figcaption>${item.photo}</figcaption></figure>` : `<p class="element-photo">${item.photo}</p>`}
      ${(item.extraImages || []).map((extra) => `<figure class="element-photo element-photo-extra"><img src="${extra.src}" alt="${extra.alt || item.name}" /><figcaption>${extra.caption || ""}</figcaption></figure>`).join("")}
      <h4>${item.name}</h4>
      <dl>
        <dt>Funcion</dt>
        <dd>${item.role}</dd>
        <dt>Uso</dt>
        <dd>${item.use}</dd>
        <dt>Advertencias</dt>
        <dd>${renderMixedItems(item.warnings)}</dd>
      </dl>
    </div>
  `).join("");

  return `
    <section class="info-card elements-card">
      <h3>${card.title}</h3>
      <div class="elements-layout">
        <div class="element-buttons">${buttons}</div>
        <div class="element-details">${details}</div>
      </div>
    </section>
  `;
}

function renderOverviewMedia(media, fallbackLabel) {
  if (media && media.src && !media.placeholder) {
    return `<figure class="overview-media"><img src="${media.src}" alt="${media.alt || ""}" /><figcaption>${fallbackLabel}</figcaption></figure>`;
  }
  const text = (media && media.placeholderText) || `${fallbackLabel} pendiente`;
  return `<div class="overview-media overview-media-placeholder" role="img" aria-label="${(media && media.alt) || text}"><div class="overview-placeholder-icon" aria-hidden="true">📷</div><div class="overview-placeholder-text"><strong>${fallbackLabel}</strong><span>${text}</span></div></div>`;
}

function renderOverviewCard(card) {
  const items = (card.items || []).map((view) => `
    <article class="overview-view">
      <header class="overview-view-header">
        <h4>${view.name}</h4>
        ${view.description ? `<p>${view.description}</p>` : ""}
      </header>
      <div class="overview-media-grid">
        ${renderOverviewMedia(view.photo, "Foto real")}
        ${renderOverviewMedia(view.plan, "Plano con cotas")}
      </div>
      ${(view.visible && view.visible.length) ? `<div class="overview-visible"><strong>Elementos visibles en esta vista:</strong><ul>${view.visible.map((v) => `<li>${v}</li>`).join("")}</ul></div>` : ""}
    </article>
  `).join("");

  return `
    <section class="info-card overview-card">
      <h3>${card.title}</h3>
      ${card.intro ? `<p class="overview-intro">${card.intro}</p>` : ""}
      <div class="overview-views">${items}</div>
    </section>
  `;
}

function renderCard(card) {
  if (card.type === "elements") {
    return renderElementsCard(card);
  }
  if (card.type === "overview") {
    return renderOverviewCard(card);
  }

  const blocks = [];
  let bucket = [];
  const flush = () => {
    if (!bucket.length) return;
    if (card.type === "checklist") {
      blocks.push(`<div class="checklist">${bucket.map((t) => `<label class="check-row"><input type="checkbox" /> <span>${t}</span></label>`).join("")}</div>`);
    } else {
      blocks.push(`<ul>${bucket.map((t) => `<li>${t}</li>`).join("")}</ul>`);
    }
    bucket = [];
  };
  card.items.forEach((item) => {
    if (isWarningItem(item)) {
      flush();
      blocks.push(renderWarningRow(item));
    } else {
      bucket.push(item);
    }
  });
  flush();

  return `
    <section class="info-card ${card.type === "photos" ? "photo-card" : ""}">
      <h3>${card.title}</h3>
      ${blocks.join("")}
    </section>
  `;
}

function renderSection(id, trackHistory = true) {
  const nextState = { screen: "section", section: id };
  if (trackHistory) {
    pushCurrentState(nextState);
  }
  currentSection = id;
  const section = sectionById(id);
  sectionTitle.textContent = section.title;
  sectionHero.innerHTML = `
    <div>
      <span class="section-tag">${section.tag}</span>
      <h2>${section.title}</h2>
      <p>${section.subtitle}</p>
    </div>
    <img src="${section.image}" alt="${section.title}" />
  `;
  sectionContent.innerHTML = section.cards.map(renderCard).join("");
  renderSectionNav();
  showScreen("section");
  window.scrollTo(0, 0);
}

function openSection(id) {
  renderSection(id, true);
}

document.addEventListener("click", (event) => {
  const goButton = event.target.closest("[data-go]");
  if (goButton) {
    goToScreen(goButton.dataset.go);
    return;
  }

  const backButton = event.target.closest("[data-back]");
  if (backButton) {
    goBack();
    return;
  }

  const menuOpenButton = event.target.closest("[data-menu-open]");
  if (menuOpenButton) {
    openMenuItemById(menuOpenButton.dataset.menuOpen);
    return;
  }

  const elementButton = event.target.closest("[data-element-index]");
  if (elementButton) {
    const card = elementButton.closest(".elements-card");
    const index = elementButton.dataset.elementIndex;
    card.querySelectorAll(".element-button").forEach((button) => button.classList.toggle("active", button === elementButton));
    card.querySelectorAll(".element-detail").forEach((detail) => detail.classList.toggle("active", detail.dataset.elementDetail === index));
    return;
  }

  const menuToggle = event.target.closest("[data-menu-toggle]");
  if (menuToggle) {
    toggleMenuItem(menuToggle.closest(".menu-item"));
    return;
  }

  const sectionButton = event.target.closest("[data-section]");
  if (sectionButton) {
    openSection(sectionButton.dataset.section);
    return;
  }

  // Lightbox Zoom de Imágenes
  if (event.target.tagName === "IMG" && !event.target.classList.contains("project-logo") && !event.target.classList.contains("school-logo")) {
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImg = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    
    if (lightbox && lightboxImg) {
      lightboxImg.src = event.target.src;
      lightboxImg.alt = event.target.alt;
      
      const figure = event.target.closest("figure");
      const figcaption = figure ? figure.querySelector("figcaption") : null;
      if (lightboxCaption) {
        lightboxCaption.textContent = figcaption ? figcaption.textContent : event.target.alt;
      }
      
      lightbox.classList.add("open");
    }
    return;
  }

  // Cerrar Lightbox al hacer clic en fondo o cerrar
  const lightbox = document.getElementById("imageLightbox");
  if (lightbox && lightbox.classList.contains("open")) {
    const isCloseBtn = event.target.classList.contains("lightbox-close");
    const isModalBg = event.target === lightbox;
    if (isCloseBtn || isModalBg) {
      lightbox.classList.remove("open");
    }
  }
});

renderMenu();
renderSectionNav();
updateBackButtons();
