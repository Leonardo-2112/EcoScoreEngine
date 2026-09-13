interface StatBlockProps {
  value: string;
  label: string;
}
 
// Substitui a classe ".stat". Usado na Home (4 números fixos) e em
// Empresas (3 números que mudam com o slider de investimento) — por
// isso "value" é string: tanto aceita um texto fixo quanto um valor
// calculado dinamicamente que o pai já formatou.
export function StatBlock({ value, label }: StatBlockProps) {
  return (
    <div className="p-5 border-l-4 border-primary bg-surface">
      <strong className="block text-3xl leading-none">{value}</strong>
      <span>{label}</span>
    </div>
  );
}