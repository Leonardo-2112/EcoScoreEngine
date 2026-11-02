import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Envolve as telas do participante. Sem login, redireciona para /login
// com a mensagem "Faça login para continuar" e a rota de origem.
export function RotaProtegida() {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" replace state={{ mensagem: "Faça login para continuar.", de: location.pathname }} />;
  }

  return <Outlet />;
}
