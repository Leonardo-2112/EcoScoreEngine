import { useCallback, useEffect, useState } from "react";
import type { Acao } from "../types/api";
import { getAcaoById } from "../services/acaoService";
import { ApiError } from "../services/api";

interface UseAcaoResult {
  dados: Acao | null;
  loading: boolean;
  erro: ApiError | null;
  recarregar: () => void;
}

// Ação escolhida na tela 06 (tela 07). Depende do id, ao contrário do
// useEffect(..., []) do ProductPage do NexStore, que ignorava o id.
export function useAcao(id: number): UseAcaoResult {
  const [dados, setDados] = useState<Acao | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<ApiError | null>(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true;
    setLoading(true);
    setErro(null);
    if (!Number.isInteger(id) || id <= 0) {
      setErro(new ApiError(404, "Ação não encontrada."));
      setLoading(false);
      return;
    }
    getAcaoById(id)
      .then((acao) => {
        if (ativo) setDados(acao);
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
  }, [id, tentativa]);

  const recarregar = useCallback(() => setTentativa((t) => t + 1), []);

  return { dados, loading, erro, recarregar };
}
