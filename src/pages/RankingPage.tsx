import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";
import type { ItemRankingDestacado } from "../types/api";
import { useAuth } from "../hooks/useAuth";
import { useRanking } from "../hooks/useRanking";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { formatarKg, formatarPontos } from "../utils/formatadores";
import { Container } from "../components/Container";
import { TituloTela } from "../components/TituloTela";
import { GridSkeleton } from "../components/GridSkeleton";
import { MensagemErro } from "../components/MensagemErro";
import { ListaVazia } from "../components/ListaVazia";

interface LinhaRankingProps {
  item: ItemRankingDestacado;
}

// Uma linha do ranking: posição, nome, nível/CO₂ e pontos.
// A linha do usuário logado fica verde-clara com borda verde-escura.
function LinhaRanking({ item }: LinhaRankingProps) {
  const destaque = item.usuarioLogado
    ? "border-primary-dark bg-primary-light"
    : "border-border bg-surface";
  const corPosicao = item.posicao === 1 ? "bg-primary-dark" : "bg-[#9fb59a]";

  return (
    <li
      aria-current={item.usuarioLogado ? "true" : undefined}
      className={`card flex items-center gap-3 px-3 py-3 sm:px-4 xl:py-4 ${destaque}`}
    >
      <span
        className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white md:size-8 md:text-sm ${corPosicao}`}
      >
        {item.posicao}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-text md:text-base">{item.nome}</p>
        <p className="truncate text-xs text-muted">
          {item.nivel} · {formatarKg(item.co2EvitadoKg)} de CO₂
        </p>
      </div>
      <span className="shrink-0 text-sm font-bold text-primary-dark md:text-base">
        {formatarPontos(item.pontosAcumulados)} pontos
      </span>
    </li>
  );
}

// Tela 10: ranking pelos pontos acumulados, com o usuário logado em destaque.
export function RankingPage() {
  useDocumentTitle("Ranking");
  const { usuario } = useAuth();
  const usuarioId = usuario?.id ?? 0;
  const { dados, loading, erro, recarregar } = useRanking();

  // Marca a linha do usuário logado
  const ranking = useMemo<ItemRankingDestacado[]>(
    () => dados.map((item) => ({ ...item, usuarioLogado: item.usuarioId === usuarioId })),
    [dados, usuarioId],
  );

  return (
    <Container variante="tela">
      <TituloTela titulo="Ranking" subtitulo="Pontuação atual de todos os participantes ativos." />

      {loading ? (
        <GridSkeleton quantidade={5} />
      ) : erro ? (
        <MensagemErro titulo="Não foi possível carregar o ranking." mensagem={erro.message} onTentarNovamente={recarregar} />
      ) : ranking.length === 0 ? (
        <ListaVazia
          mensagem="Nenhum participante no ranking ainda."
          linkTexto="Voltar ao menu"
          linkPara="/menu"
          icone={Trophy}
        />
      ) : (
        <>
          <ol className="grid gap-2.5 xl:gap-3" aria-label="Ranking de participantes">
            {ranking.map((item) => (
              <LinhaRanking key={item.usuarioId} item={item} />
            ))}
          </ol>

          <Link to="/menu" className="btn-primary mt-6">
            Voltar ao menu
          </Link>

          <p className="mt-10 text-center text-xs text-muted md:mt-16 xl:mt-20">
            Sua posição aparece destacada em verde.
          </p>
        </>
      )}
    </Container>
  );
}
