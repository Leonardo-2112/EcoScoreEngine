import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Header } from "../components/Header";
import { ErrorFallBack } from "../components/ErrorFallBack";
import { GridSkeleton } from "../components/GridSkeleton";
import { Container } from "../components/Container";

// Layout de todas as rotas (padrão NexStore): Header + <main> + <Outlet/>.
// O ErrorBoundary volta ao normal ao trocar de rota (resetKeys) e o Suspense
// mostra o skeleton enquanto a página carregada com lazy() chega.
// O Footer continua por página, como na Sprint 3.
export function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ErrorBoundary FallbackComponent={ErrorFallBack} resetKeys={[location.pathname]}>
          <Suspense
            fallback={
              <Container variante="tela">
                <GridSkeleton quantidade={3} aviso={false} />
              </Container>
            }
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
