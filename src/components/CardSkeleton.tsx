// Bloco cinza pulsando enquanto a API responde (padrão ProductCardSkeleton do NexStore).
export function CardSkeleton() {
  return (
    <div className="card flex animate-pulse items-center gap-3 p-3" aria-hidden="true">
      <div className="h-9 w-9 shrink-0 rounded-md bg-surface-strong" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-3/4 rounded-sm bg-surface-strong" />
        <div className="h-3 w-1/2 rounded-sm bg-surface-strong" />
      </div>
    </div>
  );
}
