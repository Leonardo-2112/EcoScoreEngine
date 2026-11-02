import type { CadastroRequest, LoginRequest, Usuario } from "../types/api";
import { request } from "./api";

// POST /auth/login → dados do usuário (com id e perfil). Não existe token:
// o id volta no header X-Usuario-Id das próximas requisições.
export function login(dados: LoginRequest): Promise<Usuario> {
  return request<Usuario>("/auth/login", { method: "POST", body: dados });
}

// POST /auth/cadastro → cria um PARTICIPANTE com a carteira zerada (201).
export function cadastrar(dados: CadastroRequest): Promise<Usuario> {
  return request<Usuario>("/auth/cadastro", { method: "POST", body: dados });
}
