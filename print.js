const tocList = document.querySelector("#tocList");
const printContent = document.querySelector("#printContent");
const PRINT_ORDER = [
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
  "mantenimiento",
  "incidencias"
];

function orderedPrintSections() {
  return PRINT_ORDER
    .map((id) => window.WTW_CONTENT.find((section) => section.id === id))
    .filter(Boolean);
}

function cardBody(card) {
  if (card.type === "elements" || card.type === "accordion") {
    return `<div class="print-elements">${card.items.map((item) => {
      const parts = [`<h4>${item.name}</h4>`];
      if (item.description) parts.push(`<p>${item.description}</p>`);
      if (item.role) parts.push(`<p><strong>Función:</strong> ${item.role}</p>`);
      if (item.use) parts.push(`<p><strong>Uso:</strong> ${item.use}</p>`);
      if (Array.isArray(item.warnings) && item.warnings.length) {
        parts.push(`<p><strong>Advertencias:</strong></p><ul>${item.warnings.map((warning) => `<li>${warning}</li>`).join("")}</ul>`);
      }
      if (item.image) {
        parts.push(`<figure class="print-element-photo"><img src="${item.image}" alt="${item.name}" /><figcaption>${item.photo || ""}</figcaption></figure>`);
      } else if (item.photo) {
        parts.push(`<p class="print-photo-note">${item.photo}</p>`);
      }
      (item.extraImages || []).forEach((extra) => {
        parts.push(`<figure class="print-element-photo"><img src="${extra.src}" alt="${extra.alt || item.name}" /><figcaption>${extra.caption || ""}</figcaption></figure>`);
      });
      return `<section class="print-element">${parts.join("")}</section>`;
    }).join("")}</div>`;
  }

  const items = card.items.map((item) => `<li>${item}</li>`).join("");
  return `<ul>${items}</ul>`;
}

const printSections = orderedPrintSections();

tocList.innerHTML = printSections.map((section) => `
  <li>${section.title}</li>
`).join("");

printContent.innerHTML = printSections.map((section, index) => `
  <article class="print-section">
    <header>
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div>
        <p>${section.tag}</p>
        <h2>${section.title}</h2>
        <small>${section.subtitle}</small>
      </div>
    </header>
    <div class="cards">
      ${section.cards.map((card) => `
        <section class="print-card ${card.type === "photos" ? "pending" : ""}">
          <h3>${card.title}</h3>
          ${cardBody(card)}
        </section>
      `).join("")}
    </div>
  </article>
`).join("");
