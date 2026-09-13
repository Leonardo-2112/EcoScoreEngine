import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Sobre } from "./pages/Sobre";
import { AppSimulador } from "./pages/AppSimulador";
import { Empresas } from "./pages/Empresas";
import { Integrantes } from "./pages/Integrantes";
import { IntegranteDetalhe } from "./pages/IntegranteDetalhe";
import { Faq } from "./pages/Faq";
import { Contato } from "./pages/Contato";
 
 
function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="sobre" element={<Sobre />} />
            <Route path="app" element={<AppSimulador />} />
            <Route path="empresas" element={<Empresas />} />
            <Route path="integrantes" element={<Integrantes />} />
            <Route path="integrantes/:id" element={<IntegranteDetalhe />} />
            <Route path="faq" element={<Faq />} />
            <Route path="contato" element={<Contato />} />
        </Route>
    </Routes>
  );
}
 
export default App;