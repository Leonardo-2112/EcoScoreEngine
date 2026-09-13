import { useState } from "react";
import { Card } from "../components/Card";
import { Tabs } from "../components/Tabs";
import { Footer } from "../components/Footer";

const tabItems = [
    {
        id: "modelo1",
        label: "Campanhas",
        title: "Campanhas ESG patrocinadas",
        description:
            "Empresas compram campanhas dentro da plataforma. Usuários registram economia, recebem créditos e a empresa recebe dashboard ESG, dados da campanha e relatórios de impacto.",
    },
    {
        id: "modelo2",
        label: "SaaS ESG",
        title: "ESG as a Service",
        description:
            "Planos corporativos com dashboard, campanhas, analytics, relatórios e ranking interno. Público ideal: grandes empresas, RH, bancos e universidades.",
    },
    {
        id: "modelo3",
        label: "Benefício interno",
        title: "Benefício corporativo interno",
        description:
            "Funcionários realizam ações sustentáveis, gerando gamificação, cultura ESG, redução de desperdício e engajamento interno.",
    },
    {
        id: "modelo4",
        label: "Marketplace",
        title: "Marketplace ESG",
        description:
            "Empresas compram créditos sustentáveis ou patrocinam ações específicas, como mobilidade urbana com recompensa premium.",
    },
];


const campaignShares = [
    { label: "Economia de energia", percent: "46%" },
    { label: "Transporte público", percent: "31%" },
    { label: "Reciclagem", percent: "23%" },
];

export function Empresas() {
    // useState do slider de investimento — os 3 números do "Impacto
    // estimado" são estado DERIVADO dele (mesmo padrão do simulador).
    const [investment, setInvestment] = useState(100000);

    const users = Math.round(investment / 22);
    const actions = Math.round(users * 3.4);
    const co2 = Math.round(actions * 1.8);

    const formatBRL = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    return (
        <>
            <section className="pt-[72px] pb-11 bg-surface-strong">
                <div className="w-[min(100%-32px,1160px)] mx-auto">
                    <p className="mb-3.5 text-accent text-sm font-black uppercase">Página da solução 2</p>
                    <h1 className="text-[clamp(2.2rem,6vw,4.9rem)] leading-[1.08] max-w-[14ch] text-primary-dark">
                        Dashboard ESG corporativo
                    </h1>
                    <p className="max-w-[780px] mt-4.5 text-[clamp(1rem,2vw,1.25rem)]">
                        Empresas financiam campanhas sustentáveis e recebem impacto ambiental, adesão dos usuários, ranking e
                        dados para relatórios.
                    </p>
                </div>
            </section>

            <section className="py-[76px]">
                <div className="w-[min(100%-32px,1160px)] mx-auto grid gap-5 grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
                    <Card>
                        <h2 className="mb-2.5">Campanha patrocinada</h2>
                        <p className="text-muted">Simule o investimento de uma empresa em uma campanha de economia de energia.</p>
                        <label className="grid gap-1.5 font-extrabold mt-4.5">
                            Investimento
                            <input
                                type="range"
                                min={20000}
                                max={180000}
                                step={5000}
                                value={investment}
                                onChange={(event) => setInvestment(Number(event.target.value))}
                            />
                        </label>
                        <p className="text-[clamp(2.5rem,8vw,4rem)] leading-none text-primary-dark font-bold mt-2">
                            {formatBRL(investment)}
                        </p>
                    </Card>

                    <Card>
                        <h2 className="mb-4">Impacto estimado</h2>
                        <div className="grid gap-4.5 grid-cols-1 sm:grid-cols-3">
                            <div className="p-5 border-l-4 border-primary bg-surface">
                                <strong className="block text-3xl leading-none">{users.toLocaleString("pt-BR")}</strong>
                                <span>usuários ativos</span>
                            </div>
                            <div className="p-5 border-l-4 border-primary bg-surface">
                                <strong className="block text-3xl leading-none">{actions.toLocaleString("pt-BR")}</strong>
                                <span>ações registradas</span>
                            </div>
                            <div className="p-5 border-l-4 border-primary bg-surface">
                                <strong className="block text-3xl leading-none">{co2.toLocaleString("pt-BR")} kg</strong>
                                <span>CO2 evitado</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            {campaignShares.map((item, index) => (
                                <div
                                    key={item.label}
                                    className={`flex items-center justify-between gap-3 py-3 ${index !== campaignShares.length - 1 ? "border-b border-border" : ""
                                        }`}
                                >
                                    <span>{item.label}</span>
                                    <strong>{item.percent}</strong>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </section>

            <section className="py-[76px] bg-surface">
                <div className="w-[min(100%-32px,1160px)] mx-auto">
                    <div className="mb-7">
                        <p className="mb-3.5 text-accent text-sm font-black uppercase">Modelo de negócio</p>
                        <h2 className="text-[clamp(1.8rem,4vw,3rem)]">Receita B2B realista</h2>
                        <p className="text-muted max-w-[640px] mt-3">
                            O melhor posicionamento é vender uma plataforma ESG mensurável, não apenas um aplicativo sustentável.
                        </p>
                    </div>
                    <Tabs items={tabItems} />
                </div>
            </section>

            <section className="py-[76px]">
                <div className="w-[min(100%-32px,1160px)] mx-auto grid gap-4.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <h3 className="mb-2.5">Por que empresas entram?</h3>
                        <p className="text-muted">
                            Compliance ESG, reputação, inteligência de dados, retenção de clientes, engajamento de usuários,
                            relatórios para investidores e diferencial de mercado.
                        </p>
                    </Card>
                    <Card>
                        <h3 className="mb-2.5">Planos sugeridos</h3>
                        <p className="text-muted">
                            Small: R$ 2k/mês. Business: R$ 10k/mês. Enterprise: R$ 50k/mês, com campanhas e relatórios avançados.
                        </p>
                    </Card>
                    <Card>
                        <h3 className="mb-2.5">Antifraude</h3>
                        <p className="text-muted">
                            Limite de 2 ações por dia por tipo, confiabilidade por validação e redução por repetição preservam a
                            integridade da campanha.
                        </p>
                    </Card>
                </div>
            </section>

            <Footer
                description="Dashboard ESG para campanhas patrocinadas."
                columns={[
                    { title: "Solução", links: [{ to: "/app", label: "App" }, { to: "/sobre", label: "Sobre" }] },
                    { title: "Projeto", links: [{ to: "/integrantes", label: "Integrantes" }, { to: "/contato", label: "Contato" }] },
                ]}
            />
        </>
    );
}




