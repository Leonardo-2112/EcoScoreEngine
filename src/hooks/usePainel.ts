import { useCallback, useEffect, useState } from "react";
import type { Painel } from "../types/api";
import { getPainel } from "../services/usuarioService";
import { ApiError } from "../services/api";

interface UsePainelResult {
  dados: Painel | null;
  loading: boolean;
  erro: ApiError | null;
  recarregar: () => void;
}

// Painel do participante: pontos, créditos, saldo em R$ e CO₂ (telas 11, 12 e 14).
// O recarregar busca de novo depois de converter ou sacar.
export function usePainel(id: number): UsePainelResult {
  const [dados, setDados] = useState<Painel | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<ApiError | null>(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true;
    setLoading(true);
    setErro(null);
    getPainel(id)
      .then((painel) => {
        if (ativo) setDados(painel);
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
