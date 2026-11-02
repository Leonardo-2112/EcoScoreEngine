// Tipagens da API Java do EcoScore Engine (espelho dos DTOs de resposta).
// Os campos têm os mesmos nomes do JSON (camelCase). Datas chegam como texto:
// "2026-10-01" (LocalDate) ou "2026-09-21T00:00:00" (LocalDateTime).

// ---------- Union types (o tsconfig usa erasableSyntaxOnly, então não há enum) ----------

export type Perfil = "PARTICIPANTE" | "VALIDADOR" | "EMPRESA";
export type StatusUsuario = "ATIVO" | "INATIVO" | "SUSPENSO";
export type StatusAtivacao = "ATIVA" | "INATIVA";
export type StatusValidacao = "PENDENTE" | "VALIDADA" | "PARCIAL" | "NEGADA";
export type TipoEvidencia = "COMPROVADA" | "PARCIAL" | "SEM_COMPROVACAO";
export type StatusSaque = "PENDENTE" | "PROCESSADO" | "CANCELADO" | "REJEITADO";

// Os três botões da tela 07 ("A ação foi validada?")
export type OpcaoValidacao = "sim" | "parcial" | "nao";

// Estado de uma tela que depende da API
export type EstadoRequisicao = "carregando" | "sucesso" | "erro" | "vazio";

// ---------- Respostas da API ----------

export interface UsuarioResumo {
  id: number;
  nome: string;
}

export interface EmpresaResumo {
  id: number;
  nome: string;
}

export interface Nivel {
  id: number;
  descricao: string;
  missoesMinimas: number;
  missoesMaximas: number | null;
  bonusPontos: number;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  dataNascimento: string;
  cep: string;
  logradouro: string | null;
  cidade: string;
  uf: string;
  chavePix: string | null;
  perfil: Perfil;
  empresa: EmpresaResumo | null;
  nivel: Nivel | null;
  pontosTotal: number;
  pontosSaldo: number;
  missoesConcluidas: number;
  tentativasLogin: number;
  dataCadastro: string;
  status: StatusUsuario;
}

export interface Painel {
  usuario: UsuarioResumo;
  nivel: Nivel;
  proximoNivel: Nivel | null;
  missoesConcluidas: number;
  missoesParaProximoNivel: number | null;
  acoesNaMissaoAtual: number;
  acoesPorMissao: number;
  pontosTotal: number;
  pontosSaldo: number;
  creditos: number;
  saldoEmReais: number;
  co2EvitadoKg: number;
  registrosCreditados: number;
  registrosPendentes: number;
  posicaoRanking: number | null;
}

export interface Categoria {
  id: number;
  nome: string;
  descricao: string | null;
}

export interface Acao {
  id: number;
  nome: string;
  descricao: string | null;
  categoria: Categoria;
  impacto: number;
  pontosBase: number;
  limiteDiario: number;
  repetivel: boolean;
  co2PorUnidade: number;
  status: StatusAtivacao;
}

export interface AcaoResumo {
  id: number;
  nome: string;
  impacto: number;
  pontosBase: number;
}

export interface CampanhaResumo {
  id: number;
  nome: string;
}

export interface RegistroAcao {
  id: number;
  usuario: UsuarioResumo;
  acao: AcaoResumo;
  campanha: CampanhaResumo | null;
  validador: UsuarioResumo | null;
  dataRealizacao: string;
  repeticoes: number;
  confiabilidade: number;
  pontosGerados: number;
  evidencia: string | null;
  validacao: StatusValidacao;
  observacao: string | null;
  dataValidacao: string | null;
}

export interface Conversao {
  id: number;
  usuarioId: number;
  pontosUtilizados: number;
  creditosGerados: number;
  dataConversao: string;
  observacao: string | null;
}

export interface Saque {
  id: number;
  usuarioId: number;
  creditosUsados: number;
  valorReais: number;
  chavePix: string;
  status: StatusSaque;
  dataSolicitacao: string;
  dataProcessamento: string | null;
  observacao: string | null;
}

export interface RankingItem {
  posicao: number;
  usuarioId: number;
  nome: string;
  nivel: string;
  missoesConcluidas: number;
  pontosAcumulados: number;
  acoesCreditadas: number;
  co2EvitadoKg: number;
}

// Corpo de erro da API: {"erro": "Not Found", "detalhe": "Acao 999 nao encontrada."}
export interface ErroApi {
  erro: string;
  detalhe: string;
}

// Erro de validação (400): mapa campo → mensagem, ex.: {"email": "E-mail invalido."}
export type ErrosValidacao = Record<string, string>;

// Resposta da API pública ViaCEP (https://viacep.com.br/ws/{cep}/json/)
export interface EnderecoViaCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean | string;
}

// ---------- Corpos enviados ----------

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
  dataNascimento: string;
  cep: string;
  logradouro: string;
  cidade: string;
  uf: string;
  chavePix: string;
}

export interface RegistroRequest {
  acaoId: number;
  tipoEvidencia: TipoEvidencia;
  evidencia: string;
}

export interface SaqueRequest {
  creditos: number;
  chavePix: string;
}

// ---------- Intersection types ----------

// Tela 08: o registro devolvido pelo POST junto com a ação completa,
// para mostrar "Ações feitas hoje x de 2" com o limite diário da ação.
export type RegistroComAcao = RegistroAcao & { acaoDetalhe: Acao };

// Tela 10: linha do ranking marcando se é o usuário logado.
export type ItemRankingDestacado = RankingItem & { usuarioLogado: boolean };
