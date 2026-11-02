import type { RankingItem } from "../types/api";
import { request } from "./api";

// GET /ranking → participantes ordenados pelos pontos acumulados (tela 10).
export function getRanking(): Promise<RankingItem[]> {
  return request<RankingItem[]>("/ranking");
}
