import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { FlowStep } from "../components/FlowStep";
import { StatBlock } from "../components/StatBlock";
import { Footer } from "../components/Footer";

const flowSteps = [
    { title: "Ação", description: "Usuário registra uma prática sustentável verificável." },
    { title: "Pontos", description: "Impacto, frequência e confiabilidade definem a pontuação." },
    { title: "Missões", description: "Cada missão reúne 3 ações sustentáveis." },
    { title: "Nível", description: "A evolução é permanente e não depende do saldo." },
    { title: "Bônus", description: "Níveis maiores aplicam multiplicadores." },
    { title: "Créditos", description: "100 pontos equivalem a 1 crédito interno." },
    { title: "Saque", description: "10 créditos equivalem a R$ 1,00." },
];

export function Home() {
    return (
    <>
        {/*
        Hero: o gradiente + imagem de fundo do .hero original vira um
        bg-[...] com sintaxe arbitrária do Tailwind (v4), sem precisar
        de CSS externo.
      */}
        <section
            className="min-h-[calc(100vh-72px)] grid items-center text-white
        bg-[linear-gradient(90deg,rgba(9,32,25,0.86),rgba(9,32,25,0.54)),url('/img/hero-ecoscore.svg')]
        bg-center bg-cover"
        >
            <div className="w-[min(100%-32px,1160px)] mx-auto">
                <div className="max-w-[730px] py-16 pb-[92px]">
                    <p className="inline-flex items-center gap-2 mb-3.5 text-accent text-sm font-black uppercase">
                        SoulUp Challenge 2026
                    </p>
                    <h1 className="text-[clamp(2.2rem,6vw,4.9rem)] leading-[1.08] max-w-[12ch]">EcoScore Engine</h1>
                    <p className="max-w-[780px] mt-4.5 text-[clamp(1rem,2vw,1.25rem)]">
                        Plataforma de engajamento ESG com métricas rastreáveis: ações sustentáveis viram pontos, missões,
                        níveis, créditos e relatórios de impacto para empresas patrocinadoras.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-7">
                        <Button variant="primary" to="/app">
                            Testar simulador
                        </Button>
                        <Button variant="secondary" to="/empresas">
                            Ver modelo B2B
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-[76px]">
            <div className="w-[min(100%-32px,1160px)] mx-auto">
                <div className="mb-7">
                    <p className="mb-3.5 text-accent text-sm font-black uppercase">Como funciona</p>
                    <h2 className="text-[clamp(1.8rem,4vw,3rem)]">Da ação ao benefício real</h2>
                </div>

                {/* grid responsivo: 1 coluna no mobile, 2 no tablet, 7 no desktop */}
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 overflow-x-auto pb-1.5" aria-label="Fluxo da solução">
                    {flowSteps.map((step) => (
                        <FlowStep key={step.title} title={step.title} description={step.description} />
                    ))}
                </div>
            </div>
        </section>