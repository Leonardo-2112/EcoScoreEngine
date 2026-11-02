import { useCallback, useEffect, useState } from "react";
import type { Acao } from "../types/api";
import { getAcoes } from "../services/acaoService";
import { ApiError } from "../services/api";

interface UseAcoesResult {
  dados: Acao[];
  loading: boolean;
  erro: ApiError | null;
  recarregar: () => void;
}

// Lista de ações ativas (tela 06), no padrão do useProducts do NexStore.
export function useAcoes(): UseAcoesResult {
  const [dados, setDados] = useState<Acao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<ApiError | null>(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true; // ignora a resposta se a tela já foi desmontada
    setLoading(true);
    setErro(null);
    getAcoes()
      .then((acoes) => {
        if (ativo) setDados(acoes);
      })
      .catch((e: unknown) => {
        if (ativo) setErro(e instanceof ApiError ? e : new ApiError(0, null));
      })
      .finally(() => {
        if (ativo) setLoading(false);
      });
    return () => {
      ativo = false;
    };
  }, [tentativa]);

  const recarregar = useCallback(() => setTentativa((t) => t + 1), []);

  return { dados, loading, erro, recarregar };
}
