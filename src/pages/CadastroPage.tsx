import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../components/Container";
import { FormField } from "../components/FormField";
import { MensagemErro } from "../components/MensagemErro";
import { TituloTela } from "../components/TituloTela";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { ApiError, mensagemDeErro } from "../services/api";
import { cadastrar } from "../services/authService";
import { buscarCep } from "../services/viaCepService";
import type { CadastroRequest } from "../types/api";
import {
  EMAIL_VALIDO,
  somenteDigitos,
  temIdadeMinima,
  validarCep,
  validarCpf,
  validarNomeCompleto,
  validarTelefone,
} from "../utils/validacoes";

// O formulário tem exatamente os campos do corpo do POST /auth/cadastro
type CadastroForm = CadastroRequest;
type CampoCadastro = keyof CadastroForm;

const CAMPOS: CampoCadastro[] = [
  "nome",
  "email",
  "senha",
  "cpf",
  "telefone",
  "dataNascimento",
  "cep",
  "logradouro",
  "cidade",
  "uf",
  "chavePix",
];

// As 27 UFs aceitas pelo CHECK da coluna SG_UF
const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
  "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

// Hoje no formato do input date ("2026-10-31"), usado como data máxima
function hojeIso(): string {
  const hoje = new Date();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${hoje.getFullYear()}-${mes}-${dia}`;
}

// Tela 04 (Criar conta) com o cadastro ampliado e o endereço pelo ViaCEP.
export function CadastroPage() {
  useDocumentTitle("Criar conta");
  const navigate = useNavigate();

  const [erroCadastro, setErroCadastro] = useState<string | null>(null);
  // Último CEP consultado no ViaCEP e a mensagem de erro dele (null = deu certo)
  const [consultaCep, setConsultaCep] = useState<{ cep: string; erro: string | null } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CadastroForm>({
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      cpf: "",
      telefone: "",
      dataNascimento: "",
      cep: "",
      logradouro: "",
      cidade: "",
      uf: "",
      chavePix: "",
    },
  });

  // useWatch observa só o CEP (o watch() do form faz o React Compiler pular o componente)
  const cep = useWatch({ control, name: "cep" });
  const digitosCep = somenteDigitos(cep ?? "");

  // "Buscando endereço…" enquanto o CEP de 8 dígitos ainda não tem resposta
  const buscandoCep = digitosCep.length === 8 && consultaCep?.cep !== digitosCep;
  const erroCep = digitosCep.length === 8 && consultaCep?.cep === digitosCep ? consultaCep.erro : null;

  // Com 8 dígitos no CEP, consulta o ViaCEP e preenche o endereço.
  // A flag "ativo" descarta a resposta de um CEP que já foi trocado.
  useEffect(() => {
    if (digitosCep.length !== 8) return;
    let ativo = true;

    buscarCep(digitosCep)
      .then((endereco) => {
        if (!ativo) return;
        setValue("logradouro", endereco.logradouro, { shouldValidate: true });
        setValue("cidade", endereco.localidade, { shouldValidate: true });
        setValue("uf", endereco.uf.toUpperCase(), { shouldValidate: true });
        setConsultaCep({ cep: digitosCep, erro: null });
      })
      .catch((erro: unknown) => {
        if (ativo) setConsultaCep({ cep: digitosCep, erro: mensagemDeErro(erro) });
      });

    return () => {
      ativo = false;
    };
  }, [digitosCep, setValue]);

  // Envia o cadastro com CPF, telefone e CEP só com dígitos
  async function handleCadastrar(dados: CadastroForm) {
    setErroCadastro(null);
    try {
      await cadastrar({
        ...dados,
        nome: dados.nome.trim(),
        email: dados.email.trim(),
        cpf: somenteDigitos(dados.cpf),
        telefone: somenteDigitos(dados.telefone),
        cep: somenteDigitos(dados.cep),
        logradouro: dados.logradouro.trim(),
        cidade: dados.cidade.trim(),
        uf: dados.uf.toUpperCase(),
        chavePix: dados.chavePix.trim(),
      });
      navigate("/login", { state: { mensagem: "Conta criada com sucesso! Entre com seu e-mail e senha." } });
    } catch (erro) {
      // 400 com mapa campo → mensagem: cada erro vai para o seu campo
      if (erro instanceof ApiError && erro.status === 400) {
        const entradas = Object.entries(erro.campos).filter(([campo]) => CAMPOS.includes(campo as CampoCadastro));
        if (entradas.length > 0) {
          entradas.forEach(([campo, mensagem]) => {
            setError(campo as CampoCadastro, { type: "server", message: mensagem }, { shouldFocus: true });
          });
          return;
        }
      }
      // 409 (e-mail ou CPF já cadastrado), regra do BO ou falha de rede
      setErroCadastro(mensagemDeErro(erro));
    }
  }

  // Atalho para os atributos de acessibilidade de cada campo
  function acessibilidade(campo: CampoCadastro) {
    return {
      "aria-invalid": errors[campo] ? ("true" as const) : ("false" as const),
      "aria-describedby": `${campo}-info`,
    };
  }

  return (
    <Container variante="tela">
      <TituloTela titulo="Criar conta" subtitulo="Cadastre-se para começar a registrar suas ações sustentáveis." />

      <form onSubmit={handleSubmit(handleCadastrar)} noValidate className="grid gap-4 md:grid-cols-2 md:gap-x-5 md:gap-y-5">
        {/* Campos do protótipo, na mesma ordem e com os mesmos textos */}
        <FormField id="nome" label="Nome" erro={errors.nome?.message} className="md:col-span-2">
          <input
            id="nome"
            type="text"
            autoComplete="name"
            placeholder="Digite seu nome"
            className="field"
            maxLength={100}
            {...acessibilidade("nome")}
            {...register("nome", {
              required: "Informe o nome completo.",
              minLength: { value: 3, message: "O nome deve ter de 3 a 100 caracteres." },
              maxLength: { value: 100, message: "O nome deve ter de 3 a 100 caracteres." },
              validate: (valor) => validarNomeCompleto(valor) || "Informe nome e sobrenome.",
            })}
          />
        </FormField>

        <FormField
          id="email"
          label="E-mail"
          ajuda="Cada e-mail só pode ser usado uma vez."
          erro={errors.email?.message}
          className="md:col-span-2"
        >
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="seuemail@exemplo.com"
            className="field"
            maxLength={150}
            {...acessibilidade("email")}
            {...register("email", {
              required: "Informe o e-mail.",
              pattern: { value: EMAIL_VALIDO, message: "Informe um e-mail válido." },
            })}
          />
        </FormField>

        <FormField
          id="senha"
          label="Senha"
          ajuda="Mínimo de 6 caracteres."
          erro={errors.senha?.message}
          className="md:col-span-2"
        >
          <input
            id="senha"
            type="password"
            autoComplete="new-password"
            placeholder="Crie uma senha"
            className="field"
            maxLength={72}
            {...acessibilidade("senha")}
            {...register("senha", {
              required: "Informe a senha.",
              minLength: { value: 6, message: "A senha deve ter de 6 a 72 caracteres." },
              maxLength: { value: 72, message: "A senha deve ter de 6 a 72 caracteres." },
            })}
          />
        </FormField>

        {/* Cadastro ampliado: dados pessoais */}
        <FormField id="cpf" label="CPF" erro={errors.cpf?.message}>
          <input
            id="cpf"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="000.000.000-00"
            className="field"
            maxLength={14}
            {...acessibilidade("cpf")}
            {...register("cpf", {
              required: "Informe o CPF.",
              validate: (valor) => validarCpf(valor) || "CPF inválido.",
            })}
          />
        </FormField>

        <FormField id="telefone" label="Telefone" ajuda="DDD + número." erro={errors.telefone?.message}>
          <input
            id="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(11) 91234-5678"
            className="field"
            maxLength={15}
            {...acessibilidade("telefone")}
            {...register("telefone", {
              required: "Informe o telefone.",
              validate: (valor) => validarTelefone(valor) || "Telefone deve ter DDD + número (10 ou 11 dígitos).",
            })}
          />
        </FormField>

        <FormField id="dataNascimento" label="Data de nascimento" erro={errors.dataNascimento?.message}>
          <input
            id="dataNascimento"
            type="date"
            autoComplete="bday"
            className="field"
            max={hojeIso()}
            {...acessibilidade("dataNascimento")}
            {...register("dataNascimento", {
              required: "Informe a data de nascimento.",
              validate: (valor) => temIdadeMinima(valor) || "É preciso ter pelo menos 16 anos.",
            })}
          />
        </FormField>

        {/* Endereço: o CEP preenche logradouro, cidade e UF pelo ViaCEP */}
        <FormField
          id="cep"
          label="CEP"
          ajuda={buscandoCep ? "Buscando endereço…" : "O endereço é preenchido automaticamente."}
          erro={errors.cep?.message ?? erroCep ?? undefined}
        >
          <input
            id="cep"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="00000-000"
            className="field"
            maxLength={9}
            {...acessibilidade("cep")}
            {...register("cep", {
              required: "Informe o CEP.",
              validate: (valor) => validarCep(valor) || "CEP deve ter 8 dígitos.",
            })}
          />
        </FormField>

        <FormField id="logradouro" label="Logradouro" erro={errors.logradouro?.message} className="md:col-span-2">
          <input
            id="logradouro"
            type="text"
            autoComplete="address-line1"
            placeholder="Rua, avenida..."
            className="field"
            maxLength={150}
            {...acessibilidade("logradouro")}
            {...register("logradouro", {
              maxLength: { value: 150, message: "O logradouro deve ter no máximo 150 caracteres." },
            })}
          />
        </FormField>

        <FormField id="cidade" label="Cidade" erro={errors.cidade?.message}>
          <input
            id="cidade"
            type="text"
            autoComplete="address-level2"
            placeholder="Sua cidade"
            className="field"
            maxLength={80}
            {...acessibilidade("cidade")}
            {...register("cidade", {
              validate: (valor) => valor.trim().length > 0 || "Informe a cidade.",
            })}
          />
        </FormField>

        <FormField id="uf" label="UF" erro={errors.uf?.message}>
          <select
            id="uf"
            autoComplete="address-level1"
            className="field"
            {...acessibilidade("uf")}
            {...register("uf", { required: "Informe a UF." })}
          >
            <option value="">Selecione</option>
            {UFS.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          id="chavePix"
          label="Chave PIX (opcional)"
          ajuda="Aparece como sugestão no saque."
          erro={errors.chavePix?.message}
          className="md:col-span-2"
        >
          <input
            id="chavePix"
            type="text"
            autoComplete="off"
            placeholder="CPF, e-mail, telefone ou chave aleatória"
            className="field"
            maxLength={150}
            {...acessibilidade("chavePix")}
            {...register("chavePix", {
              maxLength: { value: 150, message: "A chave PIX deve ter no máximo 150 caracteres." },
            })}
          />
        </FormField>

        {/* Erro geral: 409 (e-mail ou CPF já cadastrado), regra da API ou rede */}
        {erroCadastro && (
          <div className="md:col-span-2">
            <MensagemErro titulo="Não foi possível criar a conta." mensagem={erroCadastro} />
          </div>
        )}

        <div className="grid gap-2 md:col-span-2">
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando…" : "Cadastrar"}
          </button>
          {isSubmitting && (
            <p role="status" className="text-center text-xs text-muted">
              Conectando à API (pode levar até 1 minuto no primeiro acesso)…
            </p>
          )}
        </div>
      </form>

      <p className="mt-6 text-center xl:mt-8">
        <Link to="/login" className="text-sm text-primary-dark underline underline-offset-2 hover:text-primary">
          Já tenho conta
        </Link>
      </p>
    </Container>
  );
}
