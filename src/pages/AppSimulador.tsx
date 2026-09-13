import { useState } from "react";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import type { ActionType, Level, Reliability } from "../types/calculator";

const actionImpact: Record<ActionType, number> = {
    reciclagem: 5,
    transporte: 8,
    energia: 9,
    agua: 7,
    voluntariado: 6,
};

const reliabilityFactor: Record<Reliability, number> = {
    validado: 1,
    parcial: 0.7,
    pendente: 0.4,
};

const levelBonus: Record<Level, number> = {
    "1": 1,
    "2": 1.1,
    "3": 1.2,
    "4": 1.3,
};

export function AppSimulador() {
    // 4 useState, um por campo do formulário — mesmo padrão da Aula 4
    // (useState do carrinho) e da Aula 6 (useState dos campos do treino).
    const [actionType, setActionType] = useState<ActionType>("reciclagem");
    const [repeats, setRepeats] = useState(1);
    const [reliability, setReliability] = useState<Reliability>("validado");
    const [level, setLevel] = useState<Level>("1");

    // Cálculo como ESTADO DERIVADO (Aula 5: "filtered"/"categories"), e não
    // um useState + useEffect: é só matemática a partir do que já temos em
    // memória, recalculada a cada render — sem efeito colateral nenhum.
    const safeRepeats = Math.max(repeats, 1);
    const frequency = 1 / safeRepeats;
    const points = Math.round(
        actionImpact[actionType] * 10 * frequency * reliabilityFactor[reliability] * levelBonus[level],
    );
    const credits = (points / 100).toFixed(2);
    const money = (Number(credits) / 10).toFixed(2);
    const formula = `(${actionImpact[actionType]} x 10 x ${frequency.toFixed(2)} x ${reliabilityFactor[reliability]}) x ${levelBonus[level]}`;
    const progressPercent = Math.min(points, 100);

    return (
    <>
            <section className="pt-[72px] pb-11 bg-surface-strong">
                <div className="w-[min(100%-32px,1160px)] mx-auto">
                    <p className="mb-3.5 text-accent text-sm font-black uppercase">Página da solução 1</p>
                    <h1 className="text-[clamp(2.2rem,6vw,4.9rem)] leading-[1.08] max-w-[14ch] text-primary-dark">
                        Simulador do usuário
                    </h1>
                    <p className="max-w-[780px] mt-4.5 text-[clamp(1rem,2vw,1.25rem)]">
                        Demonstração prática da pontuação por ação sustentável, com conversão para créditos e valor estimado em
                        reais.
                    </p>
                </div>
            </section>

            <section className="py-[76px]">
                <div className="w-[min(100%-32px,1160px)] mx-auto grid gap-5 grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
                    <Card>
                        <h2 className="mb-4">Registrar ação</h2>
                        <form className="grid gap-4">
                            <label className="grid gap-1.5 font-extrabold">
                                Tipo de ação
                                <select
                                    value={actionType}
                                    onChange={(event) => setActionType(event.target.value as ActionType)}
                                    className="w-full min-h-[44px] border border-border rounded-lg px-3 bg-surface text-text font-normal"
                                >
                                    <option value="reciclagem">Reciclagem</option>
                                    <option value="transporte">Transporte público</option>
                                    <option value="energia">Economia de energia</option>
                                    <option value="agua">Economia de água</option>
                                    <option value="voluntariado">Voluntariado ambiental</option>
                                </select>
                            </label>

                            <label className="grid gap-1.5 font-extrabold">
                                Repetições no período
                                <input
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={repeats}
                                    onChange={(event) => setRepeats(Number(event.target.value))}
                                    className="w-full min-h-[44px] border border-border rounded-lg px-3 bg-surface text-text font-normal"
                                />
                            </label>

                            <label className="grid gap-1.5 font-extrabold">
                                Confiabilidade
                                <select
                                    value={reliability}
                                    onChange={(event) => setReliability(event.target.value as Reliability)}
                                    className="w-full min-h-[44px] border border-border rounded-lg px-3 bg-surface text-text font-normal"
                                >
                                    <option value="validado">Validado</option>
                                    <option value="parcial">Parcial</option>
                                    <option value="pendente">Pendente</option>
                                </select>
                            </label>

                            <label className="grid gap-1.5 font-extrabold">
                                Nível do usuário
                                <select
                                    value={level}
                                    onChange={(event) => setLevel(event.target.value as Level)}
                                    className="w-full min-h-[44px] border border-border rounded-lg px-3 bg-surface text-text font-normal"
                                >
                                    <option value="1">Nível 1</option>
                                    <option value="2">Nível 2</option>
                                    <option value="3">Nível 3</option>
                                    <option value="4">Nível 4</option>
                                </select>
                            </label>
                        </form>
                    </Card>

                    <Card>
            <h2 className="mb-4">Resultado</h2>
            <p className="text-[clamp(2.5rem,8vw,4rem)] leading-none text-primary-dark font-bold">{points}</p>
            <p className="text-muted">pontos calculados</p>

            <div className="h-3 overflow-hidden rounded-full bg-surface-strong mt-4">
              <span className="block h-full bg-primary" style={{ width: `${progressPercent}%` }} />
            </div>

            <div className="grid gap-4.5 grid-cols-1 sm:grid-cols-2 mt-5">
              <div className="p-5 border-l-4 border-primary bg-surface">
                <strong className="block text-3xl leading-none">{credits} créditos</strong>
                <span>100 pontos = 1 crédito</span>
              </div>
              <div className="p-5 border-l-4 border-primary bg-surface">
                <strong className="block text-3xl leading-none">R$ {money}</strong>
                <span>10 créditos = R$ 1,00</span>
              </div>
            </div>

            <p className="text-muted mt-4.5">Fórmula aplicada: <span>{formula}</span></p>
          </Card>
        </div>
      </section>

      <section className="py-[76px] bg-surface">
        <div className="w-[min(100%-32px,1160px)] mx-auto">
          <div className="mb-7">
            <p className="mb-3.5 text-accent text-sm font-black uppercase">Progressão</p>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)]">Missões e níveis</h2>
            <p className="text-muted max-w-[640px] mt-3">
              O nível não diminui quando o usuário converte pontos ou usa créditos. A evolução depende das missões
              concluídas.
            </p>
          </div>
          <div className="grid gap-4.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <h3 className="mb-2.5">Nível 1</h3>
              <p className="text-muted">0 a 4 missões concluídas. Bônus x1.0.</p>
            </Card>
            <Card>
              <h3 className="mb-2.5">Nível 2</h3>
              <p className="text-muted">5 a 9 missões concluídas. Bônus x1.1.</p>
            </Card>
            <Card>
              <h3 className="mb-2.5">Nível 3</h3>
              <p className="text-muted">10 a 19 missões concluídas. Bônus x1.2.</p>
            </Card>
            <Card>
              <h3 className="mb-2.5">Nível 4</h3>
              <p className="text-muted">20+ missões concluídas. Bônus x1.3.</p>
            </Card>
          </div>
        </div>
      </section>

      <Footer
        description="Simulador frontend do sistema de gamificação."
        columns={[
          { title: "Solução", links: [{ to: "/sobre", label: "Sobre" }, { to: "/empresas", label: "Empresas" }] },
          { title: "Projeto", links: [{ to: "/faq", label: "FAQ" }, { to: "/contato", label: "Contato" }] },
        ]}
      />
    </>
  );
}

