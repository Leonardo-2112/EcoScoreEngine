import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { Acao } from "../types/api";
import { useAcoes } from "../hooks/useAcoes";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Container } from "../components/Container";
import { TituloTela } from "../components/TituloTela";
import { MensagemErro } from "../components/MensagemErro";
import { ListaVazia } from "../components/ListaVazia";
import { GridSkeleton } from "../components/GridSkeleton";

interface OpcaoAcaoProps {
  acao: Acao;
  selecionada: boolean;
  onSelecionar: (id: number) => void;
}

// Cartão da tela 06: nome da ação e selo com o impacto. Usa um radio real
// (escondido) para ter teclado e leitor de tela de graça.
function OpcaoAcao({ acao, selecionada, onSelecionar }: OpcaoAcaoProps) {
  const estilo = selecionada
    ? "border-primary-dark bg-primary-light"
    : "border-border bg-surface hover:border-primary-line";

  return (
    <label
      className={`card flex cursor-pointer items-center justify-between gap-3 px-3 py-3 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary sm:px-4 ${estilo}`}
    >
      <input
        type="radio"
        name="acao"
        value={acao.id}
        checked={selecionada}
        onChange={() => onSelecionar(acao.id)}
        className="sr-only"
      />
      <span className="text-sm font-bold text-text">{acao.nome}</span>
      <span
        className={`grid h-6 min-w-8 shrink-0 place-items-center rounded-full px-2 text-xs font-bold text-white ${selecionada ? "bg-primary" : "bg-primary-dark"}`}
        aria-label={`impacto ${acao.impacto}`}
      >
        {acao.impacto}
      </span>
    </label>
  );
}

// Tela 06: escolha da ação a registrar (GET /acoes).
export function EscolherAcaoPage() {
  useDocumentTitle("Registrar ação");
  const navigate = useNavigate();
  const location = useLocation();
  const { dados: acoes, loading, erro, recarregar } = useAcoes();
  const [selecionadaId, setSelecionadaId] = useState<number | null>(null);

  // Mensagem enviada por outra tela (ação inexistente, resultado perdido...).
  // Fica no estado local e sai do histórico, para não voltar no F5 ou no "voltar".
  const [mensagem] = useState(() => (location.state as { mensagem?: string } | null)?.mensagem);
  useEffect(() => {
    if (location.state) navigate(location.pathname, { replace: true, state: null });
  }, [location.state, location.pathname, navigate]);
  const vazio = !loading && !erro && acoes.length === 0;

  function handleContinuar() {
    if (selecionadaId !== null) navigate(`/registrar/${selecionadaId}`);
  }

  return (
    <Container variante="tela">
      <TituloTela titulo="Escolha a ação" subtitulo="O número ao lado indica o impacto ambiental da ação." />

      {mensagem && (
        <div className="mb-4">
          <MensagemErro titulo={mensagem} />
        </div>
      )}

      {loading ? (
        <GridSkeleton quantidade={6} />
      ) : erro ? (
        <MensagemErro titulo="Não foi possível carregar as ações." mensagem={erro.message} onTentarNovamente={recarregar} />
      ) : vazio ? (
        <ListaVazia mensagem="Nenhuma ação disponível no momento." linkTexto="Voltar ao menu" linkPara="/menu" />
      ) : (
        <>
          <fieldset>
            <legend className="sr-only">Ações disponíveis</legend>
            <div className="grid gap-3 xl:grid-cols-2">
              {acoes.map((acao) => (
                <OpcaoAcao
                  key={acao.id}
                  acao={acao}
                  selecionada={acao.id === selecionadaId}
                  onSelecionar={setSelecionadaId}
                />
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={handleContinuar}
            disabled={selecionadaId === null}
            className="btn-primary mt-6 xl:mx-auto xl:flex xl:max-w-md"
          >
            Continuar
          </button>
        </>
      )}

      {/* A ListaVazia já tem o próprio link de volta */}
      {!vazio && (
        <p className="mt-6 text-center">
          <Link to="/menu" className="text-sm text-primary-dark underline underline-offset-2 hover:text-primary">
            Voltar ao menu
          </Link>
        </p>
      )}
    </Container>
  );
}
