import { useCallback, useEffect, useState } from "react";
import type { Usuario } from "../types/api";
import { getUsuarioById } from "../services/usuarioService";
import { ApiError } from "../services/api";

interface UseUsuarioResult {
  dados: Usuario | null;
  loading: boolean;
  erro: ApiError | null;
  recarregar: () => void;
}

// Dados atualizados do usuário logado (nome do menu, tela 05).
export function useUsuario(id: number): UseUsuarioResult {
  const [dados, setDados] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<ApiError | null>(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true;
    setLoading(true);
    setErro(null);
    getUsuarioById(id)
      .then((usuario) => {
        if (ativo) setDados(usuario);
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
