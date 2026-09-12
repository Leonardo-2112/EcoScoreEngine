import { Outlet } from "react-router-dom";
import { Header } from "./Header";

// Layout compartilhado por todas as rotas (Aula 6: Layout + Outlet).
// O rodapé não entra aqui porque, no site original, cada página tem um
// texto e links diferentes no footer — por isso cada Page renderiza seu
// próprio <Footer /> com o conteúdo específico dela, logo depois do <main>.
export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
