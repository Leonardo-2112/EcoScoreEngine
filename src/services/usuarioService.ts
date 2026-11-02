import type { Painel, Usuario } from "../types/api";
import { request } from "./api";

// GET /usuarios/{id} → dados do usuário logado (nome na barra verde).
export function getUsuarioById(id: number): Promise<Usuario> {
  return request<Usuario>(`/usuarios/${id}`, { usuarioId: id });
}

// GET /usuarios/{id}/painel → pontos, créditos, saldo em R$ e CO₂ evitado.
export function getPainel(id: number): Promise<Painel> {
  return request<Painel>(`/usuarios/${id}/painel`, { usuarioId: id });
}
