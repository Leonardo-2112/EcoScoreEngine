import type { Conversao, Saque, SaqueRequest } from "../types/api";
import { request } from "./api";

// POST /usuarios/{id}/conversoes → converte os múltiplos de 100 do saldo
// em créditos (sem corpo). 422 = menos de 100 pontos.
export function converterPontos(usuarioId: number): Promise<Conversao> {
  return request<Conversao>(`/usuarios/${usuarioId}/conversoes`, { method: "POST", usuarioId });
}

// POST /usuarios/{id}/saques → saque em R$ (mínimo de 10 créditos).
export function sacar(usuarioId: number, dados: SaqueRequest): Promise<Saque> {
  return request<Saque>(`/usuarios/${usuarioId}/saques`, { method: "POST", body: dados, usuarioId });
}
