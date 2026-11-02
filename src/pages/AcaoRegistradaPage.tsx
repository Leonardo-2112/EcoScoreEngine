import { Check } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";
import type { RegistroComAcao } from "../types/api";
import { useAuth } from "../hooks/useAuth";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { formatarPontos } from "../utils/formatadores";
import { Container } from "../components/Container";
import { ResumoLinhas } from "../components/ResumoLinhas";

// 1 → "1,0"; 0.7 → "0,7" (fatores do cálculo com vírgula decimal)
const fator = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// A memória de cálculo da API termina em ") x 1.1 = 55": dali sai o bônus
// do nível no momento do registro (a sessão salva pode estar desatualizada).
function bonusDaObservacao(observacao: string | null): number | null {
  const encontrado = observacao?.match(/\) x ([0-9]+(?:\.[0-9]+)?) =/);
  return encontrado ? Number(encontrado[1]) : null;
}

// Tela 08: resultado do POST /registros, recebido pelo state da navegação.
export function AcaoRegistradaPage() {
  useDocumentTitle("Ação registrada");
  const location = useLocation();
  const { usuario } = useAuth();
  const registro = (location.state as { registro?: RegistroComAcao } | null)?.registro;

  // Sem state (página recarregada ou acesso direto): não há o que mostrar
  if (!registro) {
    return <Navigate to="/registrar" replace state={{ mensagem: "Registre uma ação para ver o resultado." }} />;
  }

  const { acaoDetalhe, repeticoes, validacao, campanha } = registro;
  const pendente = validacao === "PENDENTE";
  const bonus = bonusDaObservacao(registro.observacao) ?? usuario?.nivel?.bonusPontos ?? null;

  const calculo =
    `Cálculo: impacto ${acaoDetalhe.impacto} × 10 × frequência 1/${repeticoes} × confiabilidade ${fator.format(registro.confiabilidade)}` +
    (bonus !== null ? ` × bônus do nível ${fator.format(bonus)}` : "");

  return (
    <Container variante="tela">
      <div className="mb-6 text-center">
        <span className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full border-2 border-primary-dark bg-primary-light text-primary-dark md:h-16 md:w-16">
          <Check size={28} aria-hidden="true" />
        </span>
        <h1 className="text-2xl font-bold text-primary-dark md:text-3xl">Ação registrada!</h1>
        <p className="mt-1 text-sm text-muted md:text-base">{acaoDetalhe.nome}</p>
      </div>

      <div className="rounded-lg bg-primary-dark px-4 py-5 text-center text-white md:py-6">
        <p className="text-4xl font-bold md:text-5xl">+{formatarPontos(registro.pontosGerados)}</p>
        <p className="mt-1 text-xs uppercase tracking-wide text-white/85">
          {pendente ? "Pontos aguardando validação" : "Pontos ganhos"}
        </p>
      </div>

      {pendente && (
        <p className="mt-3 text-center text-xs text-muted sm:text-sm">
          Registros parciais ou sem comprovação aguardam o validador. Os pontos entram no saldo depois da aprovação.
        </p>
      )}

      <ResumoLinhas
        className="mt-4"
        linhas={[
          { rotulo: "Ações feitas hoje", valor: `${repeticoes} de ${acaoDetalhe.limiteDiario}` },
          { rotulo: "Repetições totais", valor: String(repeticoes) },
          { rotulo: "Validação", valor: validacao },
          { rotulo: "Campanha ESG", valor: campanha?.nome ?? "Nenhuma campanha vigente" },
        ]}
      />

      <p className="mt-4 text-center text-xs text-muted">{calculo}</p>

      <Link to="/menu" className="btn-primary mt-6 xl:mx-auto xl:flex xl:max-w-md">
        Voltar ao menu
      </Link>
    </Container>
  );
}
