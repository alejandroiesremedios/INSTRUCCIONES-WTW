const tocList = document.querySelector("#tocList");
const printContent = document.querySelector("#printContent");

function cardBody(card) {
  if (card.type === "elements") {
    return `<div class="print-elements">${card.items.map((item) => `
      <section class="print-element">
        <h4>${item.name}</h4>
        <p><strong>Funcion:</strong> ${item.role}</p>
        <p><strong>Uso:</strong> ${item.use}</p>
        <p><strong>Advertencias:</strong></p>
        <ul>${item.warnings.map((warning) => `<li>${warning}</li>`).join("")}</ul>
        ${item.image ? `<figure class="print-element-photo"><img src="${item.image}" alt="${item.name}" /><figcaption>${item.photo}</figcaption></figure>` : `<p class="print-photo-note">${item.photo}</p>`}
      </section>
    `).join("")}</div>`;
  }

  const items = card.items.map((item) => `<li>${item}</li>`).join("");
  return `<ul>${items}</ul>`;
}

tocList.innerHTML = window.WTW_CONTENT.map((section) => `
  <li>${section.title}</li>
`).join("");

printContent.innerHTML = window.WTW_CONTENT.map((section, index) => `
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


