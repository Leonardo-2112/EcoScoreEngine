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