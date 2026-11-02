import { useCallback, useEffect, useState } from "react";
import type { RankingItem } from "../types/api";
import { getRanking } from "../services/rankingService";
import { ApiError } from "../services/api";

interface UseRankingResult {
  dados: RankingItem[];
  loading: boolean;
  erro: ApiError | null;
  recarregar: () => void;
}

// Ranking pelos pontos acumulados (tela 10).
export function useRanking(): UseRankingResult {
  const [dados, setDados] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<ApiError | null>(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true;
    setLoading(true);
    setErro(null);
    getRanking()
      .then((ranking) => {
        if (ativo) setDados(ranking);
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
