interface StatBlockProps {
  value: string;
  label: string;
  // "landing": números da Home (Sprint 3)
  // "tela": blocos "pontos / créditos / saldo" das telas 11 e 13 do protótipo
  variante?: "landing" | "tela";
}

// Substitui a classe ".stat". "value" é string porque recebe tanto um
// texto fixo quanto um valor que o pai já formatou ("R$ 0,10").
export function StatBlock({ value, label, variante = "landing" }: StatBlockProps) {
  if (variante === "tela") {
    return (
      <div className="grid gap-1.5 rounded-lg border border-primary-line bg-primary-light p-2">
        <strong className="block rounded-md border border-primary-line bg-[#e4f6e9] py-3 text-center text-xl text-primary-dark md:text-2xl">
          {value}
        </strong>
        <span className="block rounded-md border border-primary-line bg-[#e4f6e9] py-1.5 text-center text-[0.7rem] uppercase tracking-wider text-muted">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className="p-5 border-l-4 border-primary bg-surface">
      <strong className="block text-3xl leading-none">{value}</strong>
      <span>{label}</span>
    </div>
  );
}
