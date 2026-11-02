import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftRight, Banknote, BarChart3, HelpCircle, Info, LogOut, Mail, Plus, Users, Wallet } from "lucide-react";
import { Container } from "../components/Container";
import { TituloTela } from "../components/TituloTela";
import { MenuOpcao } from "../components/MenuOpcao";
import { MensagemErro } from "../components/MensagemErro";
import { useAuth } from "../hooks/useAuth";
import { useUsuario } from "../hooks/useUsuario";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { primeiroNome } from "../utils/formatadores";

// Os 5 atalhos do protótipo (o 6º, "Sair da conta", é um botão)
const opcoes = [
  { to: "/registrar", icone: Plus, titulo: "Registrar ação", descricao: "Some pontos por uma ação sustentável" },
  { to: "/ranking", icone: BarChart3, titulo: "Ver ranking", descricao: "Pontuação de todos os participantes" },
  { to: "/converter", icone: ArrowLeftRight, titulo: "Converter pontos em créditos", descricao: "100 pontos = 1 crédito" },
  { to: "/sacar", icone: Banknote, titulo: "Sacar dinheiro", descricao: "A partir de 10 créditos" },
  { to: "/carteira", icone: Wallet, titulo: "Consultar créditos", descricao: "Saldo da sua carteira" },
];

// Atalhos acrescentados para as páginas obrigatórias do professor
const institucionais = [
  { to: "/integrantes", icone: Users, titulo: "Conhecer os integrantes", descricao: "A equipe GaiaTech" },
  { to: "/sobre", icone: Info, titulo: "Sobre o projeto", descricao: "Problema, solução e roadmap" },
  { to: "/faq", icone: HelpCircle, titulo: "Perguntas frequentes", descricao: "Pontos, créditos e saque" },
  { to: "/contato", icone: Mail, titulo: "Fale conosco", descricao: "Envie sua mensagem" },
];

// Tela 05: menu do participante, primeira tela depois do login.
export function MenuPage() {
  useDocumentTitle("Menu do participante");
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  // GET /usuarios/{id}: confirma a conta na API e traz o nome atualizado
  const { dados, erro, recarregar } = useUsuario(usuario?.id ?? 0);

  // "Sair da conta" volta para a landing. A sessão só é encerrada quando o menu
  // desmonta (a rota já mudou); antes disso a RotaProtegida mandaria para /login.
  const saindo = useRef(false);
  useEffect(() => {
    return () => {
      if (saindo.current) logout();
    };
  }, [logout]);

  const handleSair = useCallback(() => {
    saindo.current = true;
    navigate("/", { replace: true });
  }, [navigate]);

  const nome = primeiroNome(dados?.nome ?? usuario?.nome ?? "");

  return (
    <Container variante="tela">
      <TituloTela titulo="O que deseja fazer?" subtitulo={`Olá, ${nome}! Escolha uma das opções disponíveis.`} />

      {erro && (
        <div className="mb-4">
          <MensagemErro titulo="Não foi possível atualizar seus dados." mensagem={erro.message} onTentarNovamente={recarregar} />
        </div>
      )}

      <nav aria-label="Opções do participante" className="grid gap-3 lg:grid-cols-2 xl:gap-4">
        {opcoes.map((opcao) => (
          <MenuOpcao key={opcao.to} {...opcao} />
        ))}
        <MenuOpcao icone={LogOut} titulo="Sair da conta" descricao="Encerra a sessão atual" variante="neutro" onClick={handleSair} />
      </nav>

      <h2 className="mt-8 mb-3 text-sm font-bold uppercase tracking-wide text-muted">Conheça o EcoScore Engine</h2>
      <nav aria-label="Páginas institucionais" className="grid gap-3 sm:grid-cols-2 xl:gap-4">
        {institucionais.map((opcao) => (
          <MenuOpcao key={opcao.to} {...opcao} />
        ))}
      </nav>
    </Container>
  );
}
