const screens = {
  start: document.querySelector('[data-screen="start"]'),
  menu: document.querySelector('[data-screen="menu"]'),
  section: document.querySelector('[data-screen="section"]')
};

const menuGrid = document.querySelector("#menuGrid");
const sectionTitle = document.querySelector("#sectionTitle");
const sectionHero = document.querySelector("#sectionHero");
const sectionContent = document.querySelector("#sectionContent");

let currentSection = "prevencion";
const navigationHistory = [];
const mqMobile = window.matchMedia("(max-width: 768px)");
const CONTENT_ORDER = [
  "prevencion",
  "conoce",
  "panel",
  "televisores",
  "camaras",
  "pc",
  "sonido",
  "traslado",
  "soldadura",
  "electrico",
  "mantenimiento"
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
        <div class="content-columns menu-content-columns">
          ${section.cards.map(renderCard).join("")}
        </div>
      </div>
    </article>
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
        ${item.role ? `<dt>Función</dt><dd>${item.role}</dd>` : ""}
        ${item.use ? `<dt>Uso</dt><dd>${item.use}</dd>` : ""}
        ${Array.isArray(item.warnings) && item.warnings.length ? `<dt>Advertencias</dt><dd>${renderMixedItems(item.warnings)}</dd>` : ""}
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

function renderImageAnnotations(annotations) {
  if (!Array.isArray(annotations) || !annotations.length) return "";
  const items = annotations.map((a) => {
    const x = typeof a.x === "number" ? a.x : 50;
    const y = typeof a.y === "number" ? a.y : 50;
    const from = a.from || "right";
    const len = a.length || 80;
    const label = `<span class="anno-label">${a.label || ""}</span>`;
    let svg;
    let parts;
    if (from === "right" || from === "left") {
      const tipLeft = from === "right";
      const x1 = tipLeft ? len : 0;
      const x2 = tipLeft ? 16 : len - 16;
      const head = tipLeft ? `0,8 16,2 16,14` : `${len},8 ${len - 16},2 ${len - 16},14`;
      svg = `<svg class="anno-svg" viewBox="0 0 ${len} 16" width="${len}" height="16" aria-hidden="true"><line x1="${x1}" y1="8" x2="${x2}" y2="8" stroke="#ff4d00" stroke-width="4" stroke-linecap="round"/><polygon points="${head}" fill="#ff4d00"/></svg>`;
      parts = tipLeft ? svg + label : label + svg;
    } else {
      const tipTop = from === "bottom";
      const y1 = tipTop ? len : 0;
      const y2 = tipTop ? 16 : len - 16;
      const head = tipTop ? `8,0 2,16 14,16` : `8,${len} 2,${len - 16} 14,${len - 16}`;
      svg = `<svg class="anno-svg" viewBox="0 0 16 ${len}" width="16" height="${len}" aria-hidden="true"><line x1="8" y1="${y1}" x2="8" y2="${y2}" stroke="#ff4d00" stroke-width="4" stroke-linecap="round"/><polygon points="${head}" fill="#ff4d00"/></svg>`;
      parts = tipTop ? svg + label : label + svg;
    }
    return `<div class="anno anno-from-${from}" style="left:${x}%;top:${y}%">${parts}</div>`;
  }).join("");
  return `<div class="image-annotations" aria-hidden="false">${items}</div>`;
}

function wrapImageWithAnnotations(imgHtml, annotations) {
  const anno = renderImageAnnotations(annotations);
  return anno ? `<div class="image-annotated">${imgHtml}${anno}</div>` : imgHtml;
}

function renderAccordionCard(card) {
  const items = card.items.map((item, index) => {
    const extras = (item.extraImages || []).map((extra) => {
      const zoom = extra.zoom;
      if (zoom) {
        const scale = zoom.scale || 2;
        const origin = zoom.origin || "50% 50%";
        const styleAttr = ` style="--zoom-scale:${scale};--zoom-origin:${origin}"`;
        const imgTag = `<img src="${extra.src}" alt="${extra.alt || item.name}" data-zoom-scale="${scale}" data-zoom-origin="${origin}" />`;
        return `<figure class="element-photo element-photo-extra element-photo-zoom"${styleAttr}><div class="zoom-frame">${wrapImageWithAnnotations(imgTag, extra.annotations)}</div><figcaption>${extra.caption || ""}</figcaption></figure>`;
      }
      const imgTag = `<img src="${extra.src}" alt="${extra.alt || item.name}" />`;
      return `<figure class="element-photo element-photo-extra">${wrapImageWithAnnotations(imgTag, extra.annotations)}<figcaption>${extra.caption || ""}</figcaption></figure>`;
    }).join("");
    const mainPhoto = item.image
      ? `<figure class="element-photo">${wrapImageWithAnnotations(`<img src="${item.image}" alt="${item.name}" />`, item.annotations)}<figcaption>${item.photo || ""}</figcaption></figure>`
      : (item.photo ? `<p class="element-photo">${item.photo}</p>` : "");
    const detailParts = [];
    if (item.description) {
      detailParts.push(`<p class="accordion-description">${item.description}</p>`);
    }
    if (item.role || item.use || (Array.isArray(item.warnings) && item.warnings.length)) {
      const dlRows = [];
      if (item.role) dlRows.push(`<dt>Función</dt><dd>${item.role}</dd>`);
      if (item.use) dlRows.push(`<dt>Uso</dt><dd>${item.use}</dd>`);
      if (Array.isArray(item.warnings) && item.warnings.length) dlRows.push(`<dt>Advertencias</dt><dd>${renderMixedItems(item.warnings)}</dd>`);
      detailParts.push(`<dl>${dlRows.join("")}</dl>`);
    }
    return `
      <article class="accordion-item">
        <button class="accordion-trigger" data-accordion-toggle="${index}" aria-expanded="false">
          <span class="accordion-index">${String(index + 1).padStart(2, "0")}</span>
          <strong>${item.name}</strong>
          <span class="accordion-caret" aria-hidden="true">▾</span>
        </button>
        <div class="accordion-panel" hidden>
          ${mainPhoto}
          ${extras}
          ${detailParts.join("")}
        </div>
      </article>
    `;
  }).join("");

  return `
    <section class="info-card accordion-card">
      <h3>${card.title}</h3>
      <div class="accordion-list">${items}</div>
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
  if (card.type === "accordion") {
    return renderAccordionCard(card);
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
  `;
  sectionContent.innerHTML = section.cards.map(renderCard).join("");
  sectionContent.querySelectorAll(".info-card > h3").forEach((h3) => {
    h3.setAttribute("role", "button");
    h3.setAttribute("tabindex", "0");
    h3.setAttribute("aria-expanded", "false");
  });
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

  const cardTitle = event.target.closest("h3");
  if (cardTitle && cardTitle.parentElement?.classList.contains("info-card") && mqMobile.matches) {
    const card = cardTitle.parentElement;
    const willOpen = !card.classList.contains("open");
    card.classList.toggle("open", willOpen);
    cardTitle.setAttribute("aria-expanded", String(willOpen));
    return;
  }

  const accordionTrigger = event.target.closest("[data-accordion-toggle]");
  if (accordionTrigger) {
    const item = accordionTrigger.closest(".accordion-item");
    const panel = item.querySelector(".accordion-panel");
    const willOpen = !item.classList.contains("open");
    item.classList.toggle("open", willOpen);
    accordionTrigger.setAttribute("aria-expanded", String(willOpen));
    panel.hidden = !willOpen;
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

  if (event.target.tagName === "IMG" && !event.target.classList.contains("project-logo") && !event.target.classList.contains("school-logo") && !event.target.classList.contains("topbar-logo")) {
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImg = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxFrame = lightbox ? lightbox.querySelector(".lightbox-frame") : null;

    if (lightbox && lightboxImg) {
      lightboxImg.src = event.target.src;
      lightboxImg.alt = event.target.alt;

      const zoomScale = event.target.dataset.zoomScale;
      const zoomOrigin = event.target.dataset.zoomOrigin;
      if (zoomScale) {
        lightbox.classList.add("zoom-mode");
        lightboxImg.style.setProperty("--zoom-scale", zoomScale);
        lightboxImg.style.setProperty("--zoom-origin", zoomOrigin || "50% 50%");
      } else {
        lightbox.classList.remove("zoom-mode");
        lightboxImg.style.removeProperty("--zoom-scale");
        lightboxImg.style.removeProperty("--zoom-origin");
      }

      if (lightboxFrame) {
        const previousAnno = lightboxFrame.querySelector(".image-annotations");
        if (previousAnno) previousAnno.remove();
        const sourceWrapper = event.target.closest(".image-annotated");
        const sourceAnno = sourceWrapper ? sourceWrapper.querySelector(".image-annotations") : null;
        if (sourceAnno && !zoomScale) {
          lightboxFrame.classList.add("lightbox-frame-annotated");
          lightboxFrame.appendChild(sourceAnno.cloneNode(true));
        } else {
          lightboxFrame.classList.remove("lightbox-frame-annotated");
        }
      }

      const figure = event.target.closest("figure");
      const figcaption = figure ? figure.querySelector("figcaption") : null;
      if (lightboxCaption) {
        lightboxCaption.textContent = figcaption ? figcaption.textContent : event.target.alt;
      }

      lightbox.classList.add("open");
    }
    return;
  }

  const lightbox = document.getElementById("imageLightbox");
  if (lightbox && lightbox.classList.contains("open")) {
    const isCloseBtn = event.target.classList.contains("lightbox-close");
    const isModalBg = event.target === lightbox;
    if (isCloseBtn || isModalBg) {
      lightbox.classList.remove("open");
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const cardTitle = event.target.closest?.("h3");
  if (!cardTitle || !cardTitle.parentElement?.classList.contains("info-card") || !mqMobile.matches) return;
  event.preventDefault();
  const card = cardTitle.parentElement;
  const willOpen = !card.classList.contains("open");
  card.classList.toggle("open", willOpen);
  cardTitle.setAttribute("aria-expanded", String(willOpen));
});

renderMenu();
updateBackButtons();
