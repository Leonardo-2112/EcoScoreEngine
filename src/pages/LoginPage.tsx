import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Container } from "../components/Container";
import { FormField } from "../components/FormField";
import { MensagemErro } from "../components/MensagemErro";
import { TituloTela } from "../components/TituloTela";
import { useAuth } from "../hooks/useAuth";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { ApiError, mensagemDeErro } from "../services/api";
import { EMAIL_VALIDO } from "../utils/validacoes";

interface LoginForm {
  email: string;
  senha: string;
}

// O que pode chegar no state da rota: aviso da RotaProtegida ou do cadastro
interface LoginLocationState {
  mensagem?: string;
  de?: string;
}

interface ErroLogin {
  titulo: string;
  mensagem: string;
}

// Títulos da caixa vermelha para cada status da API (tela 03)
const TITULOS_ERRO: Record<number, string> = {
  0: "Não foi possível entrar.",
  401: "Senha incorreta.",
  403: "Acesso negado.",
  423: "Conta bloqueada.",
};

// Telas 02 (Login) e 03 (Login — senha incorreta) do protótipo.
export function LoginPage() {
  useDocumentTitle("Entrar");
  const { usuario, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? null) as LoginLocationState | null;
  const destino = state?.de ?? "/menu";

  const [erroLogin, setErroLogin] = useState<ErroLogin | null>(null);
  const [senhaIncorreta, setSenhaIncorreta] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ defaultValues: { email: "", senha: "" } });

  // Quem já está logado não precisa ver o login de novo
  if (usuario) {
    return <Navigate to={destino} replace />;
  }

  // Envia e-mail e senha; em caso de erro, mostra a caixa vermelha da tela 03
  async function handleEntrar(dados: LoginForm) {
    setErroLogin(null);
    setSenhaIncorreta(false);
    try {
      await login(dados.email.trim(), dados.senha);
      navigate(destino, { replace: true });
    } catch (erro) {
      if (erro instanceof ApiError) {
        setSenhaIncorreta(erro.status === 401);
        setErroLogin({
          titulo: TITULOS_ERRO[erro.status] ?? "Não foi possível entrar.",
          mensagem: erro.message,
        });
      } else {
        // Perfil VALIDADOR ou EMPRESA (recusado pelo AuthContext)
        setErroLogin({ titulo: mensagemDeErro(erro), mensagem: "" });
      }
    }
  }

  const erroSenha = errors.senha?.message;

  return (
    <Container variante="tela">
      <TituloTela titulo="Entrar" subtitulo="Informe os dados da sua conta para acessar o sistema." />

      {/* Aviso vindo de outra tela ("Faça login para continuar.", "Conta criada...") */}
      {state?.mensagem && (
        <p
          role="status"
          className="mb-5 rounded-lg border border-primary-line bg-primary-light px-4 py-3 text-sm font-semibold text-primary-dark"
        >
          {state.mensagem}
        </p>
      )}

      <form onSubmit={handleSubmit(handleEntrar)} noValidate className="grid gap-4 md:gap-5">
        <FormField id="email" label="E-mail" erro={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="seuemail@exemplo.com"
            className="field"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby="email-info"
            {...register("email", {
              required: "Informe o e-mail.",
              pattern: { value: EMAIL_VALIDO, message: "Informe um e-mail válido." },
            })}
          />
        </FormField>

        <FormField id="senha" label="Senha" erro={erroSenha}>
          <input
            id="senha"
            type="password"
            autoComplete="current-password"
            className="field"
            aria-invalid={erroSenha || senhaIncorreta ? "true" : "false"}
            aria-describedby="senha-info"
            {...register("senha", {
              required: "Informe a senha.",
              onChange: () => setSenhaIncorreta(false),
            })}
          />
        </FormField>

        {/* Caixa vermelha da tela 03, entre a senha e o botão */}
        {erroLogin && <MensagemErro titulo={erroLogin.titulo} mensagem={erroLogin.mensagem || undefined} />}

        <div className="grid gap-2">
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Entrando…" : "Entrar"}
          </button>
          {/* A API no Render "dorme" e demora no primeiro acesso */}
          {isSubmitting && (
            <p role="status" className="text-center text-xs text-muted">
              Conectando à API (pode levar até 1 minuto no primeiro acesso)…
            </p>
          )}
        </div>
      </form>

      <p className="mt-6 text-center">
        <Link to="/" className="text-sm text-primary-dark underline underline-offset-2 hover:text-primary">
          Voltar para a tela inicial
        </Link>
      </p>

      {/* Rodapé cinza do protótipo */}
      <p className="mt-16 text-center text-xs text-muted sm:mt-20 lg:mt-24 xl:mt-32">
        Contas de demonstração criadas pela carga inicial do banco.
      </p>
    </Container>
  );
}
