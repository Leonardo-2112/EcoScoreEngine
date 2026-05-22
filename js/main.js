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