import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";
import type { Usuario } from "../types/api";
import { login as loginApi } from "../services/authService";

const CHAVE_SESSAO = "ecoscore:usuario";

export interface AuthContextValue {
  usuario: Usuario | null;
  login: (email: string, senha: string) => Promise<Usuario>;
  logout: () => void;
}

// Contexto da sessão (useContext). Fica null fora do AuthProvider.
export const AuthContext = createContext<AuthContextValue | null>(null);

// Lê a sessão salva no navegador. O try/catch cobre navegação privada
// e JSON corrompido: nesses casos o usuário simplesmente entra de novo.
function lerSessao(): Usuario | null {
  try {
    const salvo = localStorage.getItem(CHAVE_SESSAO);
    return salvo ? (JSON.parse(salvo) as Usuario) : null;
  } catch {
    return null;
  }
}

function salvarSessao(usuario: Usuario | null): void {
  try {
    if (usuario) localStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario));
    else localStorage.removeItem(CHAVE_SESSAO);
  } catch {
    // Sem acesso ao localStorage a sessão vale só enquanto a aba estiver aberta
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(lerSessao);

  const login = useCallback(async (email: string, senha: string) => {
    const logado = await loginApi({ email, senha });
    // O protótipo só tem telas do participante: os outros perfis não entram
    if (logado.perfil !== "PARTICIPANTE") {
      salvarSessao(null);
      setUsuario(null);
      throw new Error("Este acesso é exclusivo para participantes.");
    }
    salvarSessao(logado);
    setUsuario(logado);
    return logado;
  }, []);

  const logout = useCallback(() => {
    salvarSessao(null);
    setUsuario(null);
  }, []);

  const value = useMemo(() => ({ usuario, login, logout }), [usuario, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
