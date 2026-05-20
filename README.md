# EcoScore Engine

> Plataforma de engajamento ESG com métricas rastreáveis — ações sustentáveis viram pontos, missões, créditos e relatórios de impacto para empresas patrocinadoras.

Protótipo frontend multipáginas desenvolvido para o **Challenge SoulUp/FIAP 2026**.

---

## Sobre o Projeto

O **EcoScore Engine** conecta usuários que praticam ações sustentáveis com empresas que precisam de métricas ESG rastreáveis para compliance, campanhas e relatórios de impacto.

A plataforma registra ações sustentáveis verificáveis, calcula pontos com base em impacto, frequência, confiabilidade e nível do usuário, converte pontos em créditos internos e entrega dashboards para campanhas ESG patrocinadas por empresas.

### Problema Abordado

Usuários perdem engajamento quando ações sustentáveis não geram retorno claro. Empresas, por outro lado, precisam de métricas ESG rastreáveis para compliance, reputação e relatórios. O desafio é conectar esses dois lados com uma lógica transparente, antifraude e escalável.

### Solução Proposta

- Registro de ações sustentáveis verificáveis
- Pontuação calculada por: Impacto × Frequência × Confiabilidade × Bônus de Nível
- Conversão: 100 pontos = 1 crédito interno | 10 créditos = R$ 1,00
- Dashboard ESG para empresas patrocinadoras
- Sistema de missões e níveis para engajamento contínuo

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 semântico | Estrutura e organização das páginas |
| CSS3 responsivo | Estilização, layout e responsividade |
| JavaScript puro (ES6+) | Interatividade e funcionalidades dinâmicas |
| SVG | Ícones e imagens vetoriais locais |

---

## Estrutura de Pastas

```
EcoScoreEngine/
├── index.html                  
├── README.md                   
├── pages/
│   ├── sobre.html              
│   ├── app.html               
│   ├── empresas.html           
│   ├── integrantes.html        
│   ├── faq.html                
│   └── contato.html            
└── assets/
    ├── css/
    │   └── styles.css          
    ├── js/
    │   └── main.js             
    └── img/
        ├── hero-ecoscore.svg   
        └── member-placeholder.svg  
```

---

## Páginas do Projeto

| Página | Arquivo | Descrição |
|---|---|---|
| Início | `index.html` | Apresentação do projeto, fluxo da solução e estatísticas |
| Sobre | `pages/sobre.html` | Problema, solução proposta, fórmula de pontuação e roadmap |
| App | `pages/app.html` | Simulador de pontuação ESG interativo (página da solução) |
| Empresas | `pages/empresas.html` | Dashboard ESG e modelo de negócio B2B (página da solução) |
| Integrantes | `pages/integrantes.html` | Equipe com nome, RM, turma, GitHub e LinkedIn |
| FAQ | `pages/faq.html` | Perguntas frequentes em formato accordion |
| Contato | `pages/contato.html` | Formulário com validação em JavaScript |

---

## Funcionalidades JavaScript

- **Menu responsivo** — botão hambúrguer para navegação em dispositivos móveis
- **Tabs interativas** — navegação por abas no modelo de negócio (página Empresas)
- **Accordion** — perguntas e respostas expansíveis na página FAQ
- **Validação de formulário** — campos obrigatórios, formato de e-mail e feedback visual
- **Simulador de pontuação** — cálculo dinâmico de pontos, créditos e valor em reais (página App)
- **Dashboard ESG** — controle de investimento com atualização de métricas em tempo real (página Empresas)
- **Destaque de link ativo** — menu indica a página atual automaticamente

---

## Autores e Créditos

**Turma:** 1TDSPV

| Nome | RM | GitHub | LinkedIn |
|---|---|---|---|
| Leonardo Afonço Sousa | RM573982 | [Leonardo-2112](https://github.com/Leonardo-2112) | [leonardoafoncosousa](https://www.linkedin.com/in/leonardoafoncosousa/) |
| Matheus Jones | RM573559 | [Matheus-Jones](https://github.com/Matheus-Jones) | [LinkedIn](https://www.linkedin.com/in/matheus-jones10/) |
| Syang Cristina Gomes Souza | RM569259 | [SyangSouzaa](https://github.com/SyangSouzaa) | [syang-souza](https://www.linkedin.com/in/syang-souza/) |
| Joao Machado Nascimento | RM572364 | [MachadoJN](https://github.com/MachadoJN) | [LinkedIn](https://www.linkedin.com/) |
| Vitor Gonçalves de Souza | RM569023 | [v1torceleste](https://github.com/v1torceleste) | [LinkedIn](https://www.linkedin.com/) |

---

## Link do Repositório

```
https://github.com/Leonardo-2112/EcoScoreEngine
```

---

## Contato

Para dúvidas sobre o projeto, entre em contato pelo e-mail:

ecoscore@fiap.com.br

Ou acesse a [página de contato](pages/contato.html) do site.

---

## Observação sobre Uso de IA

Este projeto foi estruturado com auxílio de IA generativa para organização e redação inicial. A utilização está documentada conforme o regulamento do Challenge SoulUp/FIAP 2026.
