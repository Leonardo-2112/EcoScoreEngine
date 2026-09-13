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
