import { Container } from "../components/Container";
import { FaqItem } from "../components/FaqItem";
import { PageHero } from "../components/PageHero";
import { Footer } from "../components/Footer";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

interface PerguntaFaq {
  question: string;
  answer: string;
}

// Respostas conferidas com as regras unificadas (docs/regras-negocio.md).
const faqItems: PerguntaFaq[] = [
  {
    question: "O que é o EcoScore Engine?",
    answer:
      "É uma plataforma de gamificação sustentável que transforma ações ambientais em pontos, missões, níveis, créditos e relatórios ESG.",
  },
  {
    question: "Como os pontos são calculados?",
    answer:
      "A pontuação usa impacto ambiental (× 10), frequência da ação no dia, confiabilidade da validação e o bônus do nível do usuário (×1,0 a ×1,3).",
  },
  {
    question: "Como funcionam as missões e os níveis?",
    answer:
      "Cada 3 ações creditadas completam 1 missão. O nível depende das missões concluídas: Iniciante (0 a 4), Engajado (5 a 9), Guardião (10 a 19) e Embaixador (20 ou mais). O nível nunca cai ao converter pontos.",
  },
  {
    question: "Como o sistema evita abuso?",
    answer:
      "Cada ação pode ser registrada no máximo 2 vezes por dia (o 2º registro vale metade). Registros parciais ou sem comprovação ficam pendentes até um Validador aprovar, com fator ×0,7 ou ×0,4.",
  },
  {
    question: "Qual é o papel das empresas?",
    answer:
      "Empresas patrocinam campanhas ESG, financiam recompensas e recebem métricas de impacto, engajamento e relatórios para tomada de decisão.",
  },
  {
    question: "Os créditos viram dinheiro?",
    answer:
      "Sim. 100 pontos equivalem a 1 crédito e 10 créditos equivalem a R$ 1,00. O saque mínimo é de 10 créditos, enviado por chave PIX.",
  },
];

export function FaqPage() {
  useDocumentTitle("FAQ");

  return (
    <>
      <PageHero
        eyebrow="Dúvidas frequentes"
        titulo="FAQ"
        descricao="Perguntas e respostas sobre o funcionamento do EcoScore Engine e seu modelo de impacto."
      />

      <section className="py-14 md:py-[76px] xl:py-24">
        <Container className="grid gap-3 md:gap-3.5 xl:gap-4">
          {faqItems.map((item, index) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} defaultOpen={index === 0} />
          ))}
        </Container>
      </section>

      <Footer
        description="FAQ interativo em React."
        columns={[
          {
            title: "Plataforma",
            links: [
              { to: "/cadastro", label: "Cadastrar-se" },
              { to: "/login", label: "Entrar" },
              { to: "/sobre", label: "Sobre" },
            ],
          },
          {
            title: "Projeto",
            links: [
              { to: "/integrantes", label: "Integrantes" },
              { to: "/contato", label: "Contato" },
            ],
          },
        ]}
      />
    </>
  );
}
