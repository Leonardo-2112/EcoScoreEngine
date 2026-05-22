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

function setupCalculator() {
  const form = $("#scoreForm");
  if (!form) return;

  const actionImpact = {
    reciclagem: 5,
    transporte: 8,
    energia: 9,
    agua: 7,
    voluntariado: 6
  };

  const reliability = {
    validado: 1,
    parcial: 0.7,
    pendente: 0.4
  };

  const levelBonus = {
    1: 1,
    2: 1.1,
    3: 1.2,
    4: 1.3
  };

   function calculate() {
    const type = $("#actionType").value;
    const repeats = Math.max(Number($("#repeats").value), 1);
    const trust = $("#reliability").value;
    const level = $("#level").value;
    const frequency = 1 / repeats;
    const points = Math.round(actionImpact[type] * 10 * frequency * reliability[trust] * levelBonus[level]);
    const credits = (points / 100).toFixed(2);
    const money = (credits / 10).toFixed(2);

    $("#pointsResult").textContent = points;
    $("#creditsResult").textContent = `${credits} créditos`;
    $("#moneyResult").textContent = `R$ ${money}`;
    $("#formulaResult").textContent = `(${actionImpact[type]} x 10 x ${frequency.toFixed(2)} x ${reliability[trust]}) x ${levelBonus[level]}`;
    $("#scoreProgress").style.setProperty("--value", `${Math.min(points, 100)}%`);
  }

  form.addEventListener("input", calculate);
  form.addEventListener("change", calculate);
  calculate();
}

function setupDashboardControls() {
  const range = $("#investmentRange");
  if (!range) return;

  function update() {
    const investment = Number(range.value);
    const users = Math.round(investment / 22);
    const actions = Math.round(users * 3.4);
    const co2 = Math.round(actions * 1.8);
    $("#investmentValue").textContent = investment.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    $("#usersValue").textContent = users.toLocaleString("pt-BR");
    $("#actionsValue").textContent = actions.toLocaleString("pt-BR");
    $("#co2Value").textContent = `${co2.toLocaleString("pt-BR")} kg`;
  }

  range.addEventListener("input", update);
  update();
}

setupNavigation();
setupTabs();
setupFaq();
setupContactForm();
setupCalculator();
setupDashboardControls();