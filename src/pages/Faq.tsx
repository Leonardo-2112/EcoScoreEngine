import { FaqItem } from "../components/FaqItem";
import { Footer } from "../components/Footer";

const faqItems = [
  {
    question: "O que é o EcoScore Engine?",
    answer:
      "É uma plataforma de gamificação sustentável que transforma ações ambientais em pontos, missões, níveis, créditos e relatórios ESG.",
  },
  {
    question: "Como os pontos são calculados?",
    answer:
      "A pontuação usa impacto ambiental, frequência da ação, confiabilidade da validação e bônus do nível do usuário.",
  },
  {
    question: "Como o sistema evita abuso?",
    answer:
      "O protótipo prevê limite de ações por dia, redução por repetição e níveis de confiabilidade para registros validados, parciais ou pendentes.",
  },
  {
    question: "Qual é o papel das empresas?",
    answer:
      "Empresas patrocinam campanhas ESG, financiam recompensas e recebem métricas de impacto, engajamento e relatórios para tomada de decisão.",
  },
  {
    question: "Os créditos viram dinheiro?",
    answer: "100 pontos equivalem a 1 crédito e 10 créditos equivalem a R$ 1,00, com saque mínimo e controle de custo.",
  },
];

export function Faq() {
  return (
    <>
      <section className="pt-[72px] pb-11 bg-surface-strong">
        <div className="w-[min(100%-32px,1160px)] mx-auto">
          <p className="mb-3.5 text-accent text-sm font-black uppercase">Dúvidas frequentes</p>
          <h1 className="text-[clamp(2.2rem,6vw,4.9rem)] leading-[1.08] max-w-[14ch] text-primary-dark">FAQ</h1>
          <p className="max-w-[780px] mt-4.5 text-[clamp(1rem,2vw,1.25rem)]">
            Perguntas e respostas sobre o funcionamento do EcoScore Engine e seu modelo de impacto.
          </p>
        </div>
      </section>

      <section className="py-[76px]">
        <div className="w-[min(100%-32px,1160px)] mx-auto grid gap-3">
          {faqItems.map((item, index) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} defaultOpen={index === 0} />
          ))}
        </div>
      </section>

      <Footer
        description="FAQ interativo em React."
        columns={[
          { title: "Solução", links: [{ to: "/app", label: "App" }, { to: "/empresas", label: "Empresas" }] },
          { title: "Projeto", links: [{ to: "/integrantes", label: "Integrantes" }, { to: "/contato", label: "Contato" }] },
        ]}
      />
    </>
  );
}
