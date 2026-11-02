import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { usePainel } from "../hooks/usePainel";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { formatarKg, formatarMoeda, formatarPontos } from "../utils/formatadores";
import { Container } from "../components/Container";
import { TituloTela } from "../components/TituloTela";
import { ResumoLinhas } from "../components/ResumoLinhas";
import { MensagemErro } from "../components/MensagemErro";
import { GridSkeleton } from "../components/GridSkeleton";

// Tela 14: créditos, saldo em reais, pontos e CO₂ evitado (somente leitura).
export function CarteiraPage() {
  useDocumentTitle("Minha carteira");
  const { usuario } = useAuth();
  const usuarioId = usuario?.id ?? 0;
  const { dados: painel, loading, erro, recarregar } = usePainel(usuarioId);

  if (!painel) {
    return (
      <Container variante="tela">
        <TituloTela titulo="Minha carteira" />
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
      <TituloTela titulo="Minha carteira" subtitulo={painel.usuario.nome} />

      <div className="rounded-lg bg-primary-dark px-4 py-5 text-center text-white md:py-6 xl:py-8">
        <strong className="block text-3xl leading-tight md:text-4xl xl:text-5xl">{formatarPontos(painel.creditos)}</strong>
        <span className="mt-1 block text-xs uppercase tracking-wider text-white/80">Créditos</span>
      </div>

      <ResumoLinhas
        className="mt-4"
        linhas={[
          { rotulo: "Saldo em dinheiro", valor: formatarMoeda(painel.saldoEmReais) },
          { rotulo: "Pontos acumulados", valor: formatarPontos(painel.pontosTotal) },
          { rotulo: "Pontos para converter", valor: formatarPontos(painel.pontosSaldo) },
        ]}
      />

      <div className="card mt-4 px-4 py-5 text-center md:py-6">
        <Leaf size={20} className="mx-auto text-primary-dark" aria-hidden="true" />
        <strong className="mt-2 block text-xl text-primary-dark md:text-2xl">{formatarKg(painel.co2EvitadoKg)}</strong>
        <span className="block text-[0.7rem] uppercase tracking-wider text-muted">De CO₂ evitado até agora</span>
      </div>

      <Link to="/menu" className="btn-primary mt-6">
        Voltar ao menu
      </Link>
    </Container>
  );
}
