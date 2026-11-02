import type { ErroApi, ErrosValidacao } from "../types/api";

// URL da API vinda do .env (VITE_API_URL). O NexStore deixava o IP fixo no
// código; aqui só fica o endereço publicado como valor padrão.
export const API_URL = (import.meta.env.VITE_API_URL ?? "https://ecoscoreengine-api.onrender.com").replace(/\/$/, "");

// Mensagens em português para cada status, usadas quando a API não manda detalhe.
const MENSAGENS_STATUS: Record<number, string> = {
  0: "Não foi possível conectar à API. Verifique sua internet e tente novamente.",
  400: "Dados inválidos. Confira os campos e tente novamente.",
  401: "E-mail ou senha inválidos.",
  403: "Você não tem permissão para esta operação.",
  404: "Registro não encontrado.",
  409: "Esse dado já está cadastrado.",
  422: "A operação não pode ser concluída pela regra de negócio.",
  423: "Conta bloqueada após 5 tentativas de senha incorretas.",
  500: "Erro interno na API. Tente novamente em instantes.",
  503: "O banco de dados está indisponível no momento.",
};

// Erro lançado por toda requisição que não volta 2xx. Guarda o status
// (0 = erro de rede), o detalhe da API e, no 400, o mapa campo → mensagem.
export class ApiError extends Error {
  status: number;
  detalhe: string | null;
  campos: ErrosValidacao;

  constructor(status: number, detalhe: string | null, campos: ErrosValidacao = {}) {
    super(detalhe ?? MENSAGENS_STATUS[status] ?? "Erro inesperado na comunicação com a API.");
    this.name = "ApiError";
    this.status = status;
    this.detalhe = detalhe;
    this.campos = campos;
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  usuarioId?: number; // vai no header X-Usuario-Id das rotas protegidas
}

// Lê o corpo de erro: {erro, detalhe} ou o mapa de validação do 400.
async function lerErro(response: Response): Promise<ApiError> {
  try {
    const corpo = (await response.json()) as Partial<ErroApi> | ErrosValidacao;
    if (typeof corpo.detalhe === "string") {
      return new ApiError(response.status, corpo.detalhe);
    }
    // Só o 400 de validação vem como mapa campo → mensagem
    if (response.status === 400) {
      const campos = Object.fromEntries(
        Object.entries(corpo).filter(([, valor]) => typeof valor === "string"),
      ) as ErrosValidacao;
      return new ApiError(400, Object.values(campos)[0] ?? null, campos);
    }
    return new ApiError(response.status, null);
  } catch {
    return new ApiError(response.status, null);
  }
}

// Cliente HTTP único do projeto, feito com fetch (sem Axios).
// Confere response.ok, coisa que o NexStore não fazia.
export async function request<T>(path: string, { method = "GET", body, usuarioId }: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (usuarioId !== undefined) headers["X-Usuario-Id"] = String(usuarioId);

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, null);
  }

  if (!response.ok) {
    throw await lerErro(response);
  }

  // 204 No Content (e respostas vazias) não têm JSON para ler
  if (response.status === 204) {
    return undefined as T;
  }
  return (await response.json()) as T;
}

// Converte qualquer erro em texto para mostrar na tela.
export function mensagemDeErro(erro: unknown): string {
  if (erro instanceof Error) return erro.message;
  return "Erro inesperado. Tente novamente.";
}
