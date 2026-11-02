import { useCallback, useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import type { OpcaoValidacao, RegistroComAcao, TipoEvidencia } from "../types/api";
import { ApiError, mensagemDeErro } from "../services/api";
import { registrarAcao } from "../services/registroService";
import { useAcao } from "../hooks/useAcao";
import { useAuth } from "../hooks/useAuth";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Container } from "../components/Container";
import { TituloTela } from "../components/TituloTela";
import { FormField } from "../components/FormField";
import { ResumoLinhas } from "../components/ResumoLinhas";
import { MensagemErro } from "../components/MensagemErro";
import { GridSkeleton } from "../components/GridSkeleton";

interface OpcaoBotao {
  valor: OpcaoValidacao;
  rotulo: string;
  fator: string;
  tipo: TipoEvidencia;
}

// Os três botões de "A ação foi validada?" e o tipo de evidência enviado à API
const OPCOES: OpcaoBotao[] = [
  { valor: "sim", rotulo: "Sim", fator: "×1,0", tipo: "COMPROVADA" },
  { valor: "parcial", rotulo: "Parcial", fator: "×0,7", tipo: "PARCIAL" },
  { valor: "nao", rotulo: "Não", fator: "×0,4", tipo: "SEM_COMPROVACAO" },
];

const MAX_EVIDENCIA = 500;

// Tela 07 (validação) e tela 09 (limite diário atingido, como estado).
export function ConfirmarRegistroPage() {
  useDocumentTitle("Confirmar registro");
  const { acaoId } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const usuarioId = usuario?.id ?? 0;
  const { dados: acao, loading, erro, recarregar } = useAcao(Number(acaoId));

  const [opcao, setOpcao] = useState<OpcaoValidacao>("sim");
  const [evidencia, setEvidencia] = useState("");
  const [erroEvidencia, setErroEvidencia] = useState<string | null>(null);
  const [erroEnvio, setErroEnvio] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [limiteAtingido, setLimiteAtingido] = useState(false);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!acao) return;
      const tipo = OPCOES.find((o) => o.valor === opcao)?.tipo ?? "COMPROVADA";
      const texto = evidencia.trim();

      // A API exige evidência quando a ação é comprovada ("Sim")
      if (tipo === "COMPROVADA" && !texto) {
        setErroEvidencia("Descreva a evidência para registrar a ação como validada (Sim).");
        return;
      }

      setErroEvidencia(null);
      setErroEnvio(null);
      setEnviando(true);
      try {
        const registro = await registrarAcao(usuarioId, { acaoId: acao.id, tipoEvidencia: tipo, evidencia: texto });
        navigate(`/registrar/${acao.id}/registrada`, {
          state: { registro: { ...registro, acaoDetalhe: acao } satisfies RegistroComAcao },
        });
      } catch (err: unknown) {
        // 422 "Limite diario atingido..." → tela 09; o resto aparece na caixa vermelha
        if (err instanceof ApiError && err.status === 422 && err.detalhe?.startsWith("Limite diario atingido")) {
          setLimiteAtingido(true);
        } else {
          setErroEnvio(mensagemDeErro(err));
        }
        setEnviando(false);
      }
    },
    [acao, opcao, evidencia, usuarioId, navigate],
  );

  function handleEvidencia(valor: string) {
    setEvidencia(valor);
    if (erroEvidencia) setErroEvidencia(null);
  }

  // Ação inexistente (ou id inválido na URL): volta para a escolha
  if (erro?.status === 404) {
    return <Navigate to="/registrar" replace state={{ mensagem: "Ação não encontrada. Escolha uma ação da lista." }} />;
  }

  if (loading || erro || !acao) {
    return (
      <Container variante="tela">
        <TituloTela titulo="Confirmar registro" />
        {erro ? (
          <MensagemErro titulo="Não foi possível carregar a ação." mensagem={erro.message} onTentarNovamente={recarregar} />
        ) : (
          <GridSkeleton quantidade={3} />
        )}
        <p className="mt-6 text-center">
          <Link to="/registrar" className="text-sm text-primary-dark underline underline-offset-2 hover:text-primary">
            Voltar
          </Link>
        </p>
      </Container>
    );
  }

  const subtitulo = `${acao.nome} · impacto ${acao.impacto}`;

  // Tela 09: limite diário atingido (nenhum ponto é creditado)
  if (limiteAtingido) {
    return (
      <Container variante="tela">
        <TituloTela titulo="Confirmar registro" subtitulo={subtitulo} />
        <MensagemErro
          titulo="Limite diário atingido para essa ação!"
          mensagem={`Você já registrou esta ação ${acao.limiteDiario} vezes hoje. Tente novamente amanhã ou escolha outra ação.`}
        />
        <ResumoLinhas
          className="mt-4"
          linhas={[
            { rotulo: "Ações feitas hoje", valor: `${acao.limiteDiario} de ${acao.limiteDiario}` },
            { rotulo: "Repetições totais", valor: String(acao.limiteDiario) },
          ]}
        />
        <Link to="/registrar" className="btn-secondary mt-6">
          Escolher outra ação
        </Link>
        <p className="mt-6 text-center">
          <Link to="/menu" className="text-sm text-primary-dark underline underline-offset-2 hover:text-primary">
            Voltar ao menu
          </Link>
        </p>
      </Container>
    );
  }

  const evidenciaObrigatoria = opcao === "sim";

  return (
    <Container variante="tela">
      <TituloTela titulo="Confirmar registro" subtitulo={subtitulo} />

      <form onSubmit={handleSubmit} noValidate className="grid gap-5">
        <div>
          <p id="validacao-rotulo" className="mb-2 text-xs font-bold text-primary-dark">
            A ação foi validada?
          </p>
          <div role="group" aria-labelledby="validacao-rotulo" className="grid grid-cols-3 gap-2 sm:gap-3">
            {OPCOES.map((item) => {
              const ativo = item.valor === opcao;
              return (
                <button
                  key={item.valor}
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => setOpcao(item.valor)}
                  className={`rounded-lg border px-2 py-2.5 text-center transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    ativo
                      ? "border-primary-dark bg-primary-light text-primary-dark ring-1 ring-primary-dark"
                      : "border-border bg-surface text-muted hover:border-primary-line"
                  }`}
                >
                  <span className="block text-sm font-bold">{item.rotulo}</span>
                  <span className="block text-xs">{item.fator}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-1.5 text-xs text-muted">A confiabilidade multiplica os pontos gerados.</p>
        </div>

        <FormField
          id="evidencia"
          label={evidenciaObrigatoria ? "Evidência (obrigatória para Sim)" : "Evidência (opcional)"}
          ajuda="Descreva a foto, o comprovante ou o local da ação."
          erro={erroEvidencia ?? undefined}
        >
          <input
            id="evidencia"
            type="text"
            value={evidencia}
            onChange={(e) => handleEvidencia(e.target.value)}
            maxLength={MAX_EVIDENCIA}
            required={evidenciaObrigatoria}
            placeholder="Ex.: nota fiscal, foto ou local da ação"
            aria-describedby="evidencia-info"
            aria-invalid={erroEvidencia ? true : undefined}
            className="field"
          />
        </FormField>

        {erroEnvio && <MensagemErro titulo="Não foi possível registrar a ação." mensagem={erroEnvio} />}

        <button type="submit" disabled={enviando} className="btn-primary">
          {enviando ? "Registrando…" : "Registrar ação"}
        </button>
      </form>

      <p className="mt-6 text-center">
        <Link to="/registrar" className="text-sm text-primary-dark underline underline-offset-2 hover:text-primary">
          Voltar
        </Link>
      </p>
    </Container>
  );
}
