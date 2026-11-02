interface MensagemErroProps {
  titulo: string;
  mensagem?: string;
  onTentarNovamente?: () => void;
}

// Caixa vermelha das telas 03 ("Senha incorreta."), 09 (limite diário)
// e 13 (créditos insuficientes). Também mostra erros de carregamento.
export function MensagemErro({ titulo, mensagem, onTentarNovamente }: MensagemErroProps) {
  return (
    <div role="alert" className="rounded-lg border border-[#f0c4b8] border-l-4 border-l-danger-dark bg-danger-bg px-4 py-3">
      <p className="text-sm font-bold text-danger-dark">{titulo}</p>
      {mensagem && <p className="mt-0.5 text-xs text-danger-dark sm:text-sm">{mensagem}</p>}
      {onTentarNovamente && (
        <button
          type="button"
          onClick={onTentarNovamente}
          className="mt-2 text-xs font-bold text-danger-dark underline underline-offset-2"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
