import { Card } from "../components/Card";
import { Tag } from "../components/Tag";
import { Footer } from "../components/Footer";

export function Sobre() {
    return (
        <>
            <section className="pt-[72px] pb-11 bg-surface-strong">
                <div className="w-[min(100%-32px,1160px)] mx-auto">
                    <p className="mb-3.5 text-accent text-sm font-black uppercase">Contexto e proposta</p>
                    <h1 className="text-[clamp(2.2rem,6vw,4.9rem)] leading-[1.08] max-w-[14ch] text-primary-dark">
                        Sobre o projeto
                    </h1>
                    <p className="max-w-[780px] mt-4.5 text-[clamp(1rem,2vw,1.25rem)]">
                        A SoulUp precisa incentivar práticas sustentáveis dentro da comunidade, pontuar ações de forma justa e
                        entregar valor real sem comprometer a integridade do sistema.
                    </p>
                </div>
            </section>

            <section className="py-[76px]">
                <div className="w-[min(100%-32px,1160px)] mx-auto grid gap-4.5 grid-cols-1 sm:grid-cols-2">
                    <Card>
                        <h2 className="mb-2.5 text-[clamp(1.8rem,4vw,3rem)]">Problema</h2>
                        <p className="text-muted">
                            Usuários podem perder engajamento quando ações sustentáveis não geram retorno claro. Empresas, por
                            outro lado, precisam de métricas ESG rastreáveis para compliance, reputação, campanhas e relatórios. O
                            desafio é conectar esses dois lados com uma lógica transparente, antifraude e escalável.
                        </p>
                    </Card>
                    <Card>
                        <h2 className="mb-2.5 text-[clamp(1.8rem,4vw,3rem)]">Solução</h2>
                        <p className="text-muted">
                            O EcoScore Engine registra ações sustentáveis, calcula pontos com base em impacto, frequência,
                            confiabilidade e bônus de nível, converte pontos em créditos e entrega dashboards para campanhas ESG
                            patrocinadas.
                        </p>
                    </Card>
                </div>
            </section>

            <section className="py-[76px] bg-surface">
                <div className="w-[min(100%-32px,1160px)] mx-auto">
                    <div className="mb-7">
                        <p className="mb-3.5 text-accent text-sm font-black uppercase">Regra central</p>
                        <h2 className="text-[clamp(1.8rem,4vw,3rem)]">Fórmula de pontuação</h2>
                    </div>
                    <div className="grid gap-4.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <h3 className="mb-2.5">Impacto</h3>
                            <p className="text-muted">
                                Define o peso ambiental da ação. Transporte público e economia de energia têm maior impacto.
                            </p>
                        </Card>
                        <Card>
                            <h3 className="mb-2.5">Frequência</h3>
                            <p className="text-muted">Reduz a pontuação quando a mesma ação é repetida muitas vezes, evitando spam.</p>
                        </Card>
                        <Card>
                            <h3 className="mb-2.5">Confiabilidade</h3>
                            <p className="text-muted">Ações validadas valem mais; registros parciais ou pendentes recebem fator menor.</p>
                        </Card>
                        <Card>
                            <h3 className="mb-2.5">Bônus</h3>
                            <p className="text-muted">Níveis maiores multiplicam os pontos e premiam usuários recorrentes.</p>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="py-[76px]">
                <div className="w-[min(100%-32px,1160px)] mx-auto">
                    <div className="mb-7">
                        <p className="mb-3.5 text-accent text-sm font-black uppercase">Roadmap</p>
                        <h2 className="text-[clamp(1.8rem,4vw,3rem)]">Evolução prevista</h2>
                    </div>
                    <div className="grid gap-4.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <Tag>Sprint 1</Tag>
                            <h3 className="mt-2.5 mb-2.5">Protótipo frontend</h3>
                            <p className="text-muted">
                                Páginas institucionais, simulador de pontuação, dashboard de campanha e formulário validado.
                            </p>
                        </Card>
                        <Card>
                            <Tag>Sprint 2</Tag>
                            <h3 className="mt-2.5 mb-2.5">Integração de dados</h3>
                            <p className="text-muted">Persistência de usuários, ranking, histórico de missões e relatórios exportáveis.</p>
                        </Card>
                        <Card>
                            <Tag>Futuro</Tag>
                            <h3 className="mt-2.5 mb-2.5">Fintech ESG</h3>
                            <p className="text-muted">
                                Carteira digital, marketplace ESG e score sustentável para bancos, seguradoras e empresas.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            <Footer
                description="Plataforma de engajamento ESG com métricas rastreáveis."
                columns={[
                    { title: "Navegação", links: [{ to: "/", label: "Início" }, { to: "/app", label: "App" }, { to: "/empresas", label: "Empresas" }] },
                    { title: "Contato", links: [{ to: "/faq", label: "FAQ" }, { to: "/contato", label: "Fale conosco" }] },
                ]}
            />
        </>
    );
}
