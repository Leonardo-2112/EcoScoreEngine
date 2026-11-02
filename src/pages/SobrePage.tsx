import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { PageHero } from "../components/PageHero";
import { Tag } from "../components/Tag";
import { Footer } from "../components/Footer";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

interface FatorFormula {
  titulo: string;
  texto: string;
}

interface EtapaRoadmap {
  tag: string;
  titulo: string;
  texto: string;
}

// Fatores da fórmula: (impacto × 10 × frequência × confiabilidade) × bônus de nível.
const fatores: FatorFormula[] = [
  {
    titulo: "Impacto",
    texto: "Define o peso ambiental da ação. Transporte público e economia de energia têm maior impacto.",
  },
  {
    titulo: "Frequência",
    texto: "Reduz a pontuação quando a mesma ação é repetida no mesmo dia (o 2º registro vale ×0,5), evitando spam.",
  },
  {
    titulo: "Confiabilidade",
    texto: "Ações comprovadas valem ×1,0; registros parciais (×0,7) ou sem comprovação (×0,4) passam pelo Validador.",
  },
  {
    titulo: "Bônus",
    texto: "Níveis maiores multiplicam os pontos (×1,0, ×1,1, ×1,2 e ×1,3) e premiam usuários recorrentes.",
  },
];

const roadmap: EtapaRoadmap[] = [
  {
    tag: "Sprint 1",
    titulo: "Protótipo frontend",
    texto: "Páginas institucionais, cálculo de pontuação, dashboard de campanha e formulário validado.",
  },
  {
    tag: "Sprint 4",
    titulo: "Integração de dados",
    texto: "Integração com a API: persistência de usuários, ranking, missões, conversão de pontos e saque.",
  },
  {
    tag: "Futuro",
    titulo: "Fintech ESG",
    texto: "Carteira digital, marketplace ESG e score sustentável para bancos, seguradoras e empresas.",
  },
];

export function SobrePage() {
  useDocumentTitle("Sobre o projeto");

  return (
    <>
      <PageHero
        eyebrow="Contexto e proposta"
        titulo="Sobre o projeto"
        descricao="A SoulUp precisa incentivar práticas sustentáveis dentro da comunidade, pontuar ações de forma justa e entregar valor real sem comprometer a integridade do sistema."
      />

      <section className="py-14 md:py-[76px] xl:py-24">
        <Container className="grid grid-cols-1 gap-4.5 md:grid-cols-2 xl:gap-6">
          <Card className="xl:p-8">
            <h2 className="mb-2.5 font-display text-[clamp(1.8rem,4vw,3rem)] xl:text-[3.25rem]">Problema</h2>
            <p className="text-muted xl:text-lg">
              Usuários podem perder engajamento quando ações sustentáveis não geram retorno claro. Empresas, por outro
              lado, precisam de métricas ESG rastreáveis para compliance, reputação, campanhas e relatórios. O desafio é
              conectar esses dois lados com uma lógica transparente, antifraude e escalável.
            </p>
          </Card>
          <Card className="xl:p-8">
            <h2 className="mb-2.5 font-display text-[clamp(1.8rem,4vw,3rem)] xl:text-[3.25rem]">Solução</h2>
            <p className="text-muted xl:text-lg">
              O EcoScore Engine registra ações sustentáveis, calcula pontos com base em impacto, frequência,
              confiabilidade e bônus de nível, converte pontos em créditos e entrega dashboards para campanhas ESG
              patrocinadas.
            </p>
          </Card>
        </Container>
      </section>

      <section className="bg-surface py-14 md:py-[76px] xl:py-24">
        <Container>
          <div className="mb-7 xl:mb-10">
            <p className="mb-3.5 text-sm font-black uppercase text-accent">Regra central</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] xl:text-[3.25rem]">Fórmula de pontuação</h2>
          </div>
          <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
            {fatores.map((fator) => (
              <Card key={fator.titulo} className="xl:p-7">
                <h3 className="mb-2.5 xl:text-xl">{fator.titulo}</h3>
                <p className="text-muted">{fator.texto}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-[76px] xl:py-24">
        <Container>
          <div className="mb-7 xl:mb-10">
            <p className="mb-3.5 text-sm font-black uppercase text-accent">Roadmap</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] xl:text-[3.25rem]">Evolução prevista</h2>
          </div>
          <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
            {roadmap.map((etapa) => (
              <Card key={etapa.tag} className="xl:p-7">
                <Tag>{etapa.tag}</Tag>
                <h3 className="mt-2.5 mb-2.5 xl:text-xl">{etapa.titulo}</h3>
                <p className="text-muted">{etapa.texto}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <Footer
        description="Plataforma de engajamento ESG com métricas rastreáveis."
        columns={[
          {
            title: "Navegação",
            links: [
              { to: "/", label: "Início" },
              { to: "/integrantes", label: "Integrantes" },
              { to: "/cadastro", label: "Cadastrar-se" },
            ],
          },
          {
            title: "Contato",
            links: [
              { to: "/faq", label: "FAQ" },
              { to: "/contato", label: "Fale conosco" },
            ],
          },
        ]}
      />
    </>
  );
}
