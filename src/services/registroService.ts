import type { RegistroAcao, RegistroRequest } from "../types/api";
import { request } from "./api";

// POST /registros → registra a ação do participante logado (201).
// 422 = limite diário atingido (tela 09).
export function registrarAcao(usuarioId: number, dados: RegistroRequest): Promise<RegistroAcao> {
  return request<RegistroAcao>("/registros", { method: "POST", body: dados, usuarioId });
}
