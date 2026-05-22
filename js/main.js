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

function setupContactForm() {
  const form = $("#contactForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;
    $$(".field-error", form).forEach((error) => (error.textContent = ""));

    ["name", "email", "message"].forEach((id) => {
      const field = $(`#${id}`);
      const error = $(`[data-error="${id}"]`);
      if (!field.value.trim()) {
        valid = false;
        error.textContent = "Preencha este campo.";
      }
    });

    const email = $("#email");
    if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      valid = false;
      $('[data-error="email"]').textContent = "Informe um e-mail válido.";
    }

    const notice = $("#formNotice");
    if (valid) {
      notice.textContent = "Mensagem registrada no protótipo. Em produção, ela seria enviada para a equipe.";
      notice.classList.add("show");
      form.reset();
    } else {
      notice.textContent = "Revise os campos destacados antes de enviar.";
      notice.classList.add("show");
    }
  });
}