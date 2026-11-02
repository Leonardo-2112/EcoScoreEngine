import { CardSkeleton } from "./CardSkeleton";

interface GridSkeletonProps {
  quantidade?: number;
  aviso?: boolean; // false quando só o código da página está carregando
}

// Lista de skeletons + aviso do Render: no plano gratuito a API "dorme"
// e o primeiro acesso pode levar até 1 minuto.
export function GridSkeleton({ quantidade = 4, aviso = true }: GridSkeletonProps) {
  return (
    <div role="status" aria-live="polite">
      {aviso && (
        <p className="mb-3 text-xs text-muted">Conectando à API (pode levar até 1 minuto no primeiro acesso)…</p>
      )}
      <div className="grid gap-3">
        {Array.from({ length: quantidade }, (_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
