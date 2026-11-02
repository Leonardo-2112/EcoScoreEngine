// Formatadores com Intl, no padrão do formatPrice do NexStore.

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const inteiro = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const umaCasa = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// 1.2 → "R$ 1,20"
export function formatarMoeda(valor: number): string {
  return moeda.format(valor);
}

// 3398 → "3.398"
export function formatarPontos(valor: number): string {
  return inteiro.format(valor);
}

// 110 → "110,0 kg"
export function formatarKg(valor: number): string {
  return `${umaCasa.format(valor)} kg`;
}

// "2026-10-01" ou "2026-10-01T14:30:00" → "01/10/2026"
export function formatarData(data: string): string {
  const [ano, mes, dia] = data.slice(0, 10).split("-");
  return `${dia}/${mes}/${ano}`;
}

// 1 → "1 crédito"; 12 → "12 créditos"
export function pluralizar(quantidade: number, singular: string, plural: string): string {
  return `${formatarPontos(quantidade)} ${quantidade === 1 ? singular : plural}`;
}

// "Ana Beatriz Lima" → "Ana" (nome na barra verde do protótipo)
export function primeiroNome(nome: string): string {
  return nome.trim().split(/\s+/)[0] ?? nome;
}
