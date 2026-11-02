import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { FlowStep } from "../components/FlowStep";
import { StatBlock } from "../components/StatBlock";
import { Footer } from "../components/Footer";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

interface PassoFluxo {
  title: string;
  description: string;
}

interface ItemValor {
  numero: string;
  titulo: string;
  texto: string;
}

interface Estatistica {
  value: string;
  label: string;
}

// Fluxo do sistema (slides): Ação → Pontos → Missões → Nível → Bônus → Créditos → Saque.
const flowSteps: PassoFluxo[] = [
  { title: "Ação", description: "Usuário registra uma prática sustentável verificável." },
  { title: "Pontos", description: "Impacto, frequência e confiabilidade definem a pontuação." },
  { title: "Missões", description: "Cada missão reúne 3 ações sustentáveis." },
  { title: "Nível", description: "A evolução é permanente e não depende do saldo." },
  { title: "Bônus", description: "Níveis maiores multiplicam os pontos (×1,0 a ×1,3)." },
  { title: "Créditos", description: "100 pontos equivalem a 1 crédito interno." },
  { title: "Saque", description: "10 créditos equivalem a R$ 1,00." },
];

const valores: ItemValor[] = [
  {
    numero: "01",
    titulo: "Engajamento sustentável",
    texto: "Pontos, ranking e missões mantêm o usuário ativo sem depender apenas de recompensa financeira.",
  },
  {
    numero: "02",
    titulo: "Economia controlada",
    texto:
      "Créditos funcionam como moeda intermediária, com limite diário de registros, saque mínimo de 10 créditos e taxa de conversão previsível.",
  },
  {
    numero: "03",
    titulo: "Campanhas ESG",
    texto: "Empresas patrocinam desafios, acompanham impacto e recebem indicadores para relatórios e reputação.",
  },
];

// Números conferidos com as regras unificadas (docs/regras-negocio.md).
const estatisticas: Estatistica[] = [
  { value: "1.000", label: "pontos = R$ 1,00" },
  { value: "4", label: "níveis de evolução" },
  { value: "3", label: "ações por missão" },
  { value: "2", label: "registros por ação a cada dia" },
];

// Landing page: a Home da Sprint 3, agora como a página antes do login.
export function HomePage() {
  useDocumentTitle("Início");

  return (
    <>
      {/*
        Hero: o gradiente + imagem de fundo do .hero original vira um
        bg-[...] com sintaxe arbitrária do Tailwind (v4), sem precisar
        de CSS externo. A altura desconta os 72px do Header.
      */}
      <section
        className="grid min-h-[calc(100vh-72px)] items-center text-white
        bg-[linear-gradient(90deg,rgba(9,32,25,0.86),rgba(9,32,25,0.54)),url('/img/hero-ecoscore.svg')]
        bg-cover bg-center"
      >
        <Container>
          <div className="max-w-[730px] py-16 pb-[92px] md:py-20 xl:max-w-[820px] xl:py-24">
            <p className="mb-3.5 inline-flex items-center gap-2 text-sm font-black uppercase text-accent xl:text-base">
              SoulUp Challenge 2026
            </p>
            <h1 className="max-w-[12ch] font-display text-[clamp(2.2rem,6vw,4.9rem)] leading-[1.08] xl:text-[5.5rem]">
              EcoScore Engine
            </h1>
            <p className="mt-4.5 max-w-[780px] text-[clamp(1rem,2vw,1.25rem)] xl:text-[1.4rem]">
              Plataforma de engajamento ESG com métricas rastreáveis: ações sustentáveis viram pontos, missões, níveis,
              créditos e relatórios de impacto para empresas patrocinadoras.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 xl:mt-9">
              <Button variant="primary" to="/cadastro">
                Criar minha conta
              </Button>
              <Button variant="secondary" to="/sobre">
                Conhecer o projeto
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-[76px] xl:py-24">
        <Container>
          <div className="mb-7 xl:mb-10">
            <p className="mb-3.5 text-sm font-black uppercase text-accent">Como funciona</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] xl:text-[3.25rem]">Da ação ao benefício real</h2>
          </div>

          {/* grid responsivo: 1 coluna no mobile, 2 no tablet, 4 no notebook e 7 em telas largas */}
          <div
            className="grid grid-cols-1 gap-3 pb-1.5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 xl:gap-4"
            aria-label="Fluxo da solução"
          >
            {flowSteps.map((step) => (
              <FlowStep key={step.title} title={step.title} description={step.description} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-14 md:py-[76px] xl:py-24">
        <Container>
          <div className="mb-7 xl:mb-10">
            <p className="mb-3.5 text-sm font-black uppercase text-accent">Valor da solução</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] xl:text-[3.25rem]">
              Gamificação para usuários, dados para empresas
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
            {valores.map((item) => (
              <Card key={item.numero} className="xl:p-7">
                <div className="mb-3.5 grid h-[42px] w-[42px] place-items-center rounded-lg bg-surface-strong font-black text-primary-dark">
                  {item.numero}
                </div>
                <h3 className="mb-2.5 xl:text-xl">{item.titulo}</h3>
                <p className="text-muted">{item.texto}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-[76px] xl:py-24">
        <Container className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
          {estatisticas.map((item) => (
            <StatBlock key={item.label} value={item.value} label={item.label} />
          ))}
        </Container>
      </section>

      <Footer
        description="Plataforma de engajamento ESG do Challenge SoulUp/FIAP 2026."
        columns={[
          {
            title: "Páginas",
            links: [
              { to: "/sobre", label: "Sobre" },
              { to: "/login", label: "Entrar" },
              { to: "/cadastro", label: "Cadastrar-se" },
            ],
          },
          {
            title: "Projeto",
            links: [
              { to: "/integrantes", label: "Integrantes" },
              { to: "/faq", label: "FAQ" },
              { to: "/contato", label: "Contato" },
            ],
          },
        ]}
      />
    </>
  );
}
