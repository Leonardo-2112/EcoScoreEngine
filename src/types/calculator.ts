// Tipagem dos valores do formulário do simulador (página App).
// Os literais espelham exatamente as options do <select> original em HTML.
export type ActionType = "reciclagem" | "transporte" | "energia" | "agua" | "voluntariado";
export type Reliability = "validado" | "parcial" | "pendente";
export type Level = "1" | "2" | "3" | "4";

export interface CalculatorInput {
  actionType: ActionType;
  repeats: number;
  reliability: Reliability;
  level: Level;
}

export interface CalculatorResult {
  points: number;
  credits: string;
  money: string;
  formula: string;
}
