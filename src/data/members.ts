import type { Member } from "../types/member";

// Mesmos 5 integrantes e mesmos dados da página integrantes.html original.
// Fica centralizado aqui porque tanto a listagem (Integrantes) quanto a
// página de detalhe (IntegranteDetalhe, rota dinâmica /integrantes/:id)
// precisam dos mesmos dados.
export const members: Member[] = [
  {
    id: "leonardo",
    name: "Leonardo Afonço Sousa",
    rm: "RM573982",
    turma: "1TDSPV",
    photo: "/img/foto_leo.png",
    github: "https://github.com/Leonardo-2112",
    linkedin: "https://www.linkedin.com/in/leonardoafoncosousa/",
  },
  {
    id: "matheus",
    name: "Matheus Jones",
    rm: "RM573559",
    turma: "1TDSPV",
    photo: "/img/foto_jones.png",
    github: "https://github.com/Matheus-Jones",
    linkedin: "https://www.linkedin.com/in/matheus-jones10/",
  },
  {
    id: "syang",
    name: "Syang Cristina Gomes Souza",
    rm: "RM569259",
    turma: "1TDSPV",
    photo: "/img/foto_syang.png",
    github: "https://github.com/SyangSouzaa",
    linkedin: "https://www.linkedin.com/in/syang-souza/",
  },
  {
    id: "joao",
    name: "Joao Machado Nascimento",
    rm: "RM572364",
    turma: "1TDSPV",
    photo: "/img/foto_machado.png",
    github: "https://github.com/MachadoJN",
    linkedin: "https://www.linkedin.com/in/jo%C3%A3o-machado-493178300",
  },
  {
    id: "vitor",
    name: "Vitor Gonçalves de Souza",
    rm: "RM569023",
    turma: "1TDSPV",
    photo: "/img/foto_vitor.png",
    github: "https://github.com/v1torceleste",
    linkedin: "https://www.linkedin.com/in/vitor-souza-39aa422b4/",
  },
];
