// Tipagem do integrante da equipe, usada na listagem (Integrantes)
// e na página de detalhe (IntegranteDetalhe), acessada via rota dinâmica.
export interface Member {
  id: string;
  name: string;
  rm: string;
  turma: string;
  photo: string;
  github: string;
  linkedin: string;
}
