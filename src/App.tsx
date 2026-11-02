import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { RotaProtegida } from "./components/RotaProtegida";

// Todas as páginas carregam sob demanda com lazy() (padrão do NexStore).
// O <Suspense> que mostra o skeleton fica no MainLayout, em volta do <Outlet/>,
// para o Header continuar na tela enquanto a página chega.
const HomePage = lazy(() => import("./pages/HomePage").then((module) => ({ default: module.HomePage })));
const LoginPage = lazy(() => import("./pages/LoginPage").then((module) => ({ default: module.LoginPage })));
const CadastroPage = lazy(() => import("./pages/CadastroPage").then((module) => ({ default: module.CadastroPage })));
const MenuPage = lazy(() => import("./pages/MenuPage").then((module) => ({ default: module.MenuPage })));
const EscolherAcaoPage = lazy(() =>
  import("./pages/EscolherAcaoPage").then((module) => ({ default: module.EscolherAcaoPage })),
);
const ConfirmarRegistroPage = lazy(() =>
  import("./pages/ConfirmarRegistroPage").then((module) => ({ default: module.ConfirmarRegistroPage })),
);
const AcaoRegistradaPage = lazy(() =>
  import("./pages/AcaoRegistradaPage").then((module) => ({ default: module.AcaoRegistradaPage })),
);
const RankingPage = lazy(() => import("./pages/RankingPage").then((module) => ({ default: module.RankingPage })));
const ConverterPage = lazy(() => import("./pages/ConverterPage").then((module) => ({ default: module.ConverterPage })));
const SacarPage = lazy(() => import("./pages/SacarPage").then((module) => ({ default: module.SacarPage })));
const CarteiraPage = lazy(() => import("./pages/CarteiraPage").then((module) => ({ default: module.CarteiraPage })));
const SobrePage = lazy(() => import("./pages/SobrePage").then((module) => ({ default: module.SobrePage })));
const IntegrantesPage = lazy(() =>
  import("./pages/IntegrantesPage").then((module) => ({ default: module.IntegrantesPage })),
);
const IntegranteDetalhePage = lazy(() =>
  import("./pages/IntegranteDetalhePage").then((module) => ({ default: module.IntegranteDetalhePage })),
);
const FaqPage = lazy(() => import("./pages/FaqPage").then((module) => ({ default: module.FaqPage })));
const ContatoPage = lazy(() => import("./pages/ContatoPage").then((module) => ({ default: module.ContatoPage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })));

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Landing e páginas institucionais (públicas) */}
        <Route index element={<HomePage />} />
        <Route path="sobre" element={<SobrePage />} />
        <Route path="integrantes" element={<IntegrantesPage />} />
        <Route path="integrantes/:id" element={<IntegranteDetalhePage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contato" element={<ContatoPage />} />

        {/* Telas 02, 03 e 04 do protótipo */}
        <Route path="login" element={<LoginPage />} />
        <Route path="cadastro" element={<CadastroPage />} />

        {/* Telas do participante: sem login, redireciona para /login com mensagem */}
        <Route element={<RotaProtegida />}>
          <Route path="menu" element={<MenuPage />} />
          <Route path="registrar" element={<EscolherAcaoPage />} />
          <Route path="registrar/:acaoId" element={<ConfirmarRegistroPage />} />
          <Route path="registrar/:acaoId/registrada" element={<AcaoRegistradaPage />} />
          <Route path="ranking" element={<RankingPage />} />
          <Route path="converter" element={<ConverterPage />} />
          <Route path="sacar" element={<SacarPage />} />
          <Route path="carteira" element={<CarteiraPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
