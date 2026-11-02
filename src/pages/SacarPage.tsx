import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import type { Saque, SaqueRequest } from "../types/api";
import { ApiError, mensagemDeErro } from "../services/api";
import { sacar } from "../services/carteiraService";
import { useAuth } from "../hooks/useAuth";
import { usePainel } from "../hooks/usePainel";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { formatarMoeda, formatarPontos } from "../utils/formatadores";
import { Container } from "../components/Container";
import { TituloTela } from "../components/TituloTela";
import { StatBlock } from "../components/StatBlock";
import { ResumoLinhas } from "../components/ResumoLinhas";
import { FormField } from "../components/FormField";
import { MensagemErro } from "../components/MensagemErro";
import { GridSkeleton } from "../components/GridSkeleton";

// Regra 8: 10 créditos = R$ 1,00 e saque a partir de 10 créditos
const VALOR_CREDITO = 0.1;
const MINIMO_SAQUE = 10;

const SUBTITULO = "Cada crédito vale R$ 0,10. O saque é liberado a partir de 10 créditos.";

interface FormularioSaqueProps {
  creditos: number;
  chavePixCadastro: string;
  onSacar: (dados: SaqueRequest) => Promise<void>;
}

// Formulário da tela 12: quantidade de créditos e chave PIX.
function FormularioSaque({ creditos, chavePixCadastro, onSacar }: FormularioSaqueProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SaqueRequest>({
    defaultValues: { creditos, chavePix: chavePixCadastro },
  });

  const quantidade = useWatch({ control, name: "creditos" });
  const quantidadeValida = Number.isFinite(quantidade) ? quantidade : 0;
  const faltam = quantidadeValida - creditos;
  // Passar do saldo aparece na caixa vermelha, não embaixo do campo
  const erroCreditos = errors.creditos?.type === "max" ? undefined : errors.creditos?.message;

  return (
    <form onSubmit={handleSubmit(onSacar)} noValidate className="mt-5 grid gap-4">
      <FormField
        id="creditos"
        label="Quantidade de créditos"
        ajuda={`Você recebe ${formatarMoeda(Math.max(quantidadeValida, 0) * VALOR_CREDITO)}`}
        erro={erroCreditos}
      >
        <input
          id="creditos"
          type="number"
          inputMode="numeric"
          min={MINIMO_SAQUE}
          max={creditos}
          step={1}
          className="field"
          aria-invalid={errors.creditos ? "true" : "false"}
          aria-describedby="creditos-info"
          {...register("creditos", {
            valueAsNumber: true,
            validate: {
              obrigatorio: (v) => Number.isFinite(v) || "Informe a quantidade de créditos.",
              inteiro: (v) => Number.isInteger(v) || "Use um número inteiro de créditos.",
              minimo: (v) => v >= MINIMO_SAQUE || `O saque mínimo é de ${MINIMO_SAQUE} créditos.`,
            },
            max: { value: creditos, message: "Créditos insuficientes para saque." },
          })}
        />
      </FormField>

      {faltam > 0 && (
        <MensagemErro titulo="Créditos insuficientes para saque." mensagem={`Faltam ${formatarPontos(faltam)}.`} />
      )}

      <FormField
        id="chavePix"
        label="Chave PIX"
        ajuda="A chave do cadastro vem preenchida. Você pode trocar."
        erro={errors.chavePix?.message}
      >
        <input
          id="chavePix"
          type="text"
          autoComplete="off"
          placeholder="E-mail, CPF, telefone ou chave aleatória"
          className="field"
          aria-invalid={errors.chavePix ? "true" : "false"}
          aria-describedby="chavePix-info"
          {...register("chavePix", {
            validate: (v) => v.trim().length > 0 || "Informe a chave PIX.",
          })}
        />
      </FormField>

      <button type="submit" disabled={isSubmitting} className="btn-primary mt-1">
        {isSubmitting ? "Enviando…" : "Confirmar saque"}
      </button>
    </form>
  );
}

// Telas 12 (saque) e 13 (menos de 10 créditos).
export function SacarPage() {
  useDocumentTitle("Sacar dinheiro");
  const { usuario } = useAuth();
  const usuarioId = usuario?.id ?? 0;
  const { dados: painel, loading, erro, recarregar } = usePainel(usuarioId);

  const [saque, setSaque] = useState<Saque | null>(null);
  const [erroSaque, setErroSaque] = useState<{ titulo: string; mensagem: string } | null>(null);

  const handleSacar = useCallback(
    async (dados: SaqueRequest) => {
      setSaque(null);
      setErroSaque(null);
      try {
        const resultado = await sacar(usuarioId, { creditos: dados.creditos, chavePix: dados.chavePix.trim() });
        setSaque(resultado);
        recarregar();
      } catch (e: unknown) {
        // 422/400: a API explica o motivo; saldo insuficiente usa o título da tela 13
        const semSaldo = e instanceof ApiError && e.status === 422 && e.detalhe?.startsWith("Saldo insuficiente");
        setErroSaque({
          titulo: semSaldo ? "Créditos insuficientes para saque." : "Não foi possível concluir o saque.",
          mensagem: mensagemDeErro(e),
        });
      }
    },
    [usuarioId, recarregar],
  );

  // Skeleton só no primeiro carregamento (no recarregar os dados continuam na tela)
  if (!painel) {
    return (
      <Container variante="tela">
        <TituloTela titulo="Sacar dinheiro" />
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

  const { creditos } = painel;
  const podeSacar = creditos >= MINIMO_SAQUE;

  return (
    <Container variante="tela">
      <TituloTela titulo="Sacar dinheiro" subtitulo={SUBTITULO} />

      {/* Fica visível mesmo se, depois do recarregar, a tela cair no estado 13 */}
      {saque && (
        <p
          role="status"
          className="mb-4 rounded-lg border border-primary-line bg-primary-light px-4 py-3 text-sm font-semibold break-words text-primary-dark"
        >
          Saque de {formatarMoeda(saque.valorReais)} enviado para a chave PIX {saque.chavePix}. Status: {saque.status}.
        </p>
      )}

      {podeSacar ? (
        <>
          <div className="rounded-lg bg-primary-dark px-4 py-5 text-center text-white md:py-6 xl:py-8">
            <strong className="block text-3xl leading-tight md:text-4xl xl:text-5xl">{formatarMoeda(painel.saldoEmReais)}</strong>
            <span className="mt-1 block text-xs uppercase tracking-wider text-white/80">Disponível para saque</span>
          </div>

          <ResumoLinhas
            className="mt-4"
            linhas={[
              { rotulo: "Créditos disponíveis", valor: formatarPontos(creditos) },
              { rotulo: "Valor por crédito", valor: formatarMoeda(VALOR_CREDITO) },
            ]}
          />

          {erroSaque && (
            <div className="mt-4">
              <MensagemErro titulo={erroSaque.titulo} mensagem={erroSaque.mensagem} />
            </div>
          )}

          {/* key: o formulário recomeça com o novo saldo depois de um saque */}
          <FormularioSaque
            key={creditos}
            creditos={creditos}
            chavePixCadastro={usuario?.chavePix ?? ""}
            onSacar={handleSacar}
          />
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 xl:gap-4">
            <StatBlock variante="tela" value={formatarPontos(creditos)} label={creditos === 1 ? "Crédito" : "Créditos"} />
            <StatBlock variante="tela" value={formatarMoeda(painel.saldoEmReais)} label="Saldo" />
          </div>

          <div className="mt-4">
            <MensagemErro
              titulo="Créditos insuficientes para saque."
              mensagem={`Você precisa de 10 créditos para sacar. Faltam ${MINIMO_SAQUE - creditos} — registre mais ações e converta seus pontos.`}
            />
          </div>

          <Link to="/registrar" className="btn-secondary mt-4">
            Registrar uma ação
          </Link>
        </>
      )}

      <Link
        to="/menu"
        className="mx-auto mt-5 block w-fit text-sm text-primary-dark underline underline-offset-2"
      >
        Voltar ao menu
      </Link>
    </Container>
  );
}
