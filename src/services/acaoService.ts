import type { Acao } from "../types/api";
import { request } from "./api";

// GET /acoes → catálogo das ações ativas (tela 06).
export function getAcoes(): Promise<Acao[]> {
  return request<Acao[]>("/acoes");
}

// GET /acoes/{id} → ação escolhida (tela 07).
export function getAcaoById(id: number): Promise<Acao> {
  return request<Acao>(`/acoes/${id}`);
}
