import { getErrorMessage, type FallbackProps } from "react-error-boundary";

// Tela mostrada pelo ErrorBoundary do MainLayout quando um componente quebra.
export function ErrorFallBack({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="mx-auto my-10 w-[min(100%-32px,640px)] rounded-lg border border-[#f0c4b8] bg-danger-bg p-6 text-center">
      <p className="font-bold text-danger-dark">Algo quebrou nesta parte da página.</p>
      <p className="mt-2 whitespace-pre-wrap font-mono text-xs text-danger-dark">{getErrorMessage(error)}</p>
      <button
        type="button"
        onClick={resetErrorBoundary}
        className="mt-4 rounded-lg bg-danger-dark px-4 py-2 text-sm font-bold text-white hover:bg-danger"
      >
        Tentar novamente
      </button>
    </div>
  );
}
