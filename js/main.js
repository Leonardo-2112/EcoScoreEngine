const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function setupNavigation() {
  const toggle = $(".nav-toggle");
  const links = $(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  const current = location.pathname.split("/").pop() || "index.html";
  $$(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (href.endsWith(current)) link.classList.add("active");
  });
}

function setupTabs() {
  $$(".tabs").forEach((tabs) => {
    const scope = tabs.closest("section") || document;
    const buttons = $$(".tab-button", tabs);
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((item) => item.classList.remove("active"));
        $$(".tab-panel", scope).forEach((panel) => panel.classList.remove("active"));
        button.classList.add("active");
        const panel = $(`#${button.dataset.tab}`, scope);
        if (panel) panel.classList.add("active");
      });
    });
  });
}

function setupFaq() {
  $$(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      item.classList.toggle("open");
    });
  });
}