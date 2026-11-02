export interface LinhaResumo {
  rotulo: string;
  valor: string;
}

interface ResumoLinhasProps {
  linhas: LinhaResumo[];
  className?: string;
}

// Quadro verde-claro com linhas "rótulo … valor" (telas 08, 09, 11, 12 e 14).
export function ResumoLinhas({ linhas, className = "" }: ResumoLinhasProps) {
  return (
    <dl className={`rounded-lg border border-primary-line bg-primary-light px-3 py-1 sm:px-4 ${className}`}>
      {linhas.map((linha) => (
        <div
          key={linha.rotulo}
          className="flex items-center justify-between gap-3 border-b border-dotted border-primary-line py-2.5 text-sm last:border-b-0"
        >
          <dt className="text-text">{linha.rotulo}</dt>
          <dd className="text-right font-bold text-primary-dark">{linha.valor}</dd>
        </div>
      ))}
    </dl>
  );
}
