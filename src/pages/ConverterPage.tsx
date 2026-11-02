import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Conversao } from "../types/api";
import { ApiError, mensagemDeErro } from "../services/api";
import { converterPontos } from "../services/carteiraService";
import { useAuth } from "../hooks/useAuth";
import { usePainel } from "../hooks/usePainel";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { formatarPontos, pluralizar } from "../utils/formatadores";
import { Container } from "../components/Container";
import { TituloTela } from "../components/TituloTela";
import { StatBlock } from "../components/StatBlock";
import { ResumoLinhas } from "../components/ResumoLinhas";
import { MensagemErro } from "../components/MensagemErro";
import { GridSkeleton } from "../components/GridSkeleton";

// Regra 7: 100 pontos = 1 crédito
const PONTOS_POR_CREDITO = 100;

interface ErroConversao {
  titulo: string;
  mensagem: string;
}

// Tela 11: converte os múltiplos de 100 do saldo em créditos.
export function ConverterPage() {
  useDocumentTitle("Converter pontos");
  const { usuario } = useAuth();
  const usuarioId = usuario?.id ?? 0;
  const { dados: painel, loading, erro, recarregar } = usePainel(usuarioId);

  const [enviando, setEnviando] = useState(false);
  const [erroConversao, setErroConversao] = useState<ErroConversao | null>(null);
  const [conversao, setConversao] = useState<Conversao | null>(null);

  const saldo = painel?.pontosSaldo ?? 0;

  // Prévia do que a API vai fazer com o saldo atual
  const previa = useMemo(() => {
    const gerados = Math.floor(saldo / PONTOS_POR_CREDITO);
    return { usados: gerados * PONTOS_POR_CREDITO, gerados, restantes: saldo % PONTOS_POR_CREDITO };
  }, [saldo]);

  const handleConverter = useCallback(async () => {
    setConversao(null);
    setErroConversao(null);

    // Menos de 100 pontos: nem chama a API
    if (saldo < PONTOS_POR_CREDITO) {
      setErroConversao({
        titulo: "Pontos insuficientes para conversão.",
        mensagem: `Você precisa de pelo menos 100 pontos. Faltam ${PONTOS_POR_CREDITO - saldo}.`,
      });
      return;
    }

    setEnviando(true);
    try {
      const resultado = await converterPontos(usuarioId);
      setConversao(resultado);
      recarregar();
    } catch (e: unknown) {
      const insuficiente = e instanceof ApiError && e.status === 422;
      setErroConversao({
        titulo: insuficiente ? "Pontos insuficientes para conversão." : "Não foi possível converter seus pontos.",
        mensagem: mensagemDeErro(e),
      });
    } finally {
      setEnviando(false);
    }
  }, [saldo, usuarioId, recarregar]);

  // Skeleton só no primeiro carregamento (no recarregar os dados continuam na tela)
  if (!painel) {
    return (
      <Container variante="tela">
        <TituloTela titulo="Converter pontos" />
        {loading ? (
          <GridSkeleton quantidade={3} />
        ) : (
          erro && (
            <MensagemErro titulo="Não foi possível carregar sua carteira." mensagem={erro.message} onTentarNovamente={recarregar} />
          )
        )}
      </Container>
    );
  }

  return (
    <Container variante="tela">
      <TituloTela
        titulo="Converter pontos"
        subtitulo="A cada 100 pontos você recebe 1 crédito. Os pontos restantes continuam na sua conta."
      />

      <div className="grid grid-cols-2 gap-3 xl:gap-4">
        <StatBlock variante="tela" value={formatarPontos(painel.pontosSaldo)} label="Pontos" />
        <StatBlock variante="tela" value={formatarPontos(painel.creditos)} label="Créditos" />
      </div>

      <ResumoLinhas
        className="mt-4"
        linhas={[
          { rotulo: "Pontos que serão usados", valor: formatarPontos(previa.usados) },
          { rotulo: "Créditos gerados", valor: formatarPontos(previa.gerados) },
          { rotulo: "Pontos que permanecem", valor: formatarPontos(previa.restantes) },
        ]}
      />

      <div className="mt-4 grid gap-3" aria-live="polite">
        {erroConversao && <MensagemErro titulo={erroConversao.titulo} mensagem={erroConversao.mensagem} />}
        {conversao && (
          <p
            role="status"
            className="rounded-lg border border-primary-line bg-primary-light px-4 py-3 text-sm font-semibold text-primary-dark"
          >
            Conversão concluída: {formatarPontos(conversao.pontosUtilizados)} pontos viraram{" "}
            {pluralizar(conversao.creditosGerados, "crédito", "créditos")}.
          </p>
        )}
      </div>

      <button type="button" onClick={handleConverter} disabled={enviando} className="btn-primary mt-6">
        {enviando ? "Convertendo…" : "Converter agora"}
      </button>

      <Link
        to="/menu"
        className="mx-auto mt-5 block w-fit text-sm text-primary-dark underline underline-offset-2"
      >
        Voltar ao menu
      </Link>

      <p className="mt-10 text-center text-xs text-muted md:mt-16 xl:mt-20">
        Toda conversão fica registrada no histórico da sua conta.
      </p>
    </Container>
  );
}
