import { Link } from "react-router-dom";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

// Rota "*": qualquer endereço que não existe (padrão do NexStore).
export function NotFoundPage() {
  useDocumentTitle("Página não encontrada");
  const { usuario } = useAuth();

  return (
    <Container variante="tela" className="py-16 text-center md:py-24 xl:py-28">
      <p className="font-display text-6xl font-bold text-primary-line xl:text-7xl">404</p>
      <h1 className="mt-3 mb-2 text-xl font-bold text-primary-dark md:text-2xl">Página não encontrada</h1>
      <p className="mb-6 text-sm text-muted">O endereço digitado não existe no EcoScore Engine.</p>
      <Link to={usuario ? "/menu" : "/"} className="btn-primary sm:w-auto sm:px-8">
        {usuario ? "Voltar ao menu" : "Voltar para a página inicial"}
      </Link>
    </Container>
  );
}
