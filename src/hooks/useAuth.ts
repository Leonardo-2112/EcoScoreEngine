import { useContext } from "react";
import { AuthContext, type AuthContextValue } from "../contexts/AuthContext";

// Atalho para ler a sessão em qualquer componente.
export function useAuth(): AuthContextValue {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth precisa estar dentro do AuthProvider.");
  }
  return contexto;
}
