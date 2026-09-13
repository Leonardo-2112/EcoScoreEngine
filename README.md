# EcoScore Engine

![Hero EcoScore Engine](./public/img/hero-ecoscore.svg)

Plataforma de engajamento ESG desenvolvida para o **Challenge SoulUp / FIAP 2026**. Usuários registram ações sustentáveis (reciclagem, transporte público, economia de energia e água, voluntariado ambiental), que são convertidas em pontos, missões, níveis e créditos. Empresas patrocinam campanhas e acompanham o impacto ambiental gerado através de um dashboard com métricas ESG.

Este repositório contém a **Sprint 3** do projeto: migração completa do protótipo estático (HTML/CSS/JS puro, Sprints 1-2) para uma aplicação React.

---

## 🚀 Tecnologias utilizadas

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/) (v4, via `@tailwindcss/vite`)
- [React Router DOM](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)

---

## 📁 Estrutura de pastas

```
ecoscore-react/
├── public/
│   └── img/                  # fotos da equipe e imagem do hero
├── src/
│   ├── components/           # componentes reutilizáveis (Header, Footer, Card, Button, etc.)
│   ├── pages/                # uma página por rota (Home, Sobre, App, Empresas, Integrantes, FAQ, Contato)
│   ├── data/                 # dados estáticos (integrantes)
│   ├── types/                # tipagens TypeScript (Member, Calculator)
│   ├── App.tsx                # definição das rotas
│   ├── main.tsx               # ponto de entrada + BrowserRouter
│   └── index.css              # import do Tailwind + tokens de tema (@theme)
├── index.html
├── vite.config.ts
├── package.json
└── README.md
```

---

## ▶️ Como executar localmente

```bash
# clonar o repositório
git clone <https://github.com/Leonardo-2112/EcoScoreEngine>
cd ecoscore-react

# instalar as dependências
npm install

# subir o servidor de desenvolvimento
npm run dev
```

A aplicação abre por padrão em `http://localhost:5173`.

Para gerar a versão de produção:

```bash
npm run build
```

---

## 🔗 Links

- **Repositório:** `<https://github.com/Leonardo-2112/EcoScoreEngine>`
---

## 👥 Integrantes

<table>
  <tr>
    <td align="center">
      <img src="./public/img/foto_leo.png" width="90" height="90" style="border-radius:50%;object-fit:cover;" alt="Foto de Leonardo Afonço Sousa"/><br/>
      <strong>Leonardo Afonço Sousa</strong><br/>
      RM573982 — 1TDSPV<br/>
      <a href="https://github.com/Leonardo-2112">GitHub</a> ·
      <a href="https://www.linkedin.com/in/leonardoafoncosousa/">LinkedIn</a>
    </td>
    <td align="center">
      <img src="./public/img/foto_jones.png" width="90" height="90" style="border-radius:50%;object-fit:cover;" alt="Foto de Matheus Jones"/><br/>
      <strong>Matheus Jones</strong><br/>
      RM573559 — 1TDSPV<br/>
      <a href="https://github.com/Matheus-Jones">GitHub</a> ·
      <a href="https://www.linkedin.com/in/matheus-jones10/">LinkedIn</a>
    </td>
    <td align="center">
      <img src="./public/img/foto_syang.png" width="90" height="90" style="border-radius:50%;object-fit:cover;" alt="Foto de Syang Cristina Gomes Souza"/><br/>
      <strong>Syang Cristina Gomes Souza</strong><br/>
      RM569259 — 1TDSPV<br/>
      <a href="https://github.com/SyangSouzaa">GitHub</a> ·
      <a href="https://www.linkedin.com/in/syang-souza/">LinkedIn</a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="./public/img/foto_machado.png" width="90" height="90" style="border-radius:50%;object-fit:cover;" alt="Foto de Joao Machado Nascimento"/><br/>
      <strong>Joao Machado Nascimento</strong><br/>
      RM572364 — 1TDSPV<br/>
      <a href="https://github.com/MachadoJN">GitHub</a> ·
      <a href="https://www.linkedin.com/in/jo%C3%A3o-machado-493178300">LinkedIn</a>
    </td>
    <td align="center">
      <img src="./public/img/foto_vitor.png" width="90" height="90" style="border-radius:50%;object-fit:cover;" alt="Foto de Vitor Gonçalves de Souza"/><br/>
      <strong>Vitor Gonçalves de Souza</strong><br/>
      RM569023 — 1TDSPV<br/>
      <a href="https://github.com/v1torceleste">GitHub</a> ·
      <a href="https://www.linkedin.com/in/vitor-souza-39aa422b4/">LinkedIn</a>
    </td>
    <td></td>
  </tr>
</table>

---

## ✉️ Contato

Dúvidas ou sugestões sobre o projeto: **ecoscore@fiap.com.br**

Projeto acadêmico — Turma **1TDSPV**, FIAP, Challenge SoulUp 2026.
