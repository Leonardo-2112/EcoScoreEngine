import { useNavigate } from "react-router-dom";
import type { Member } from "../types/member";
import { Card } from "./Card";

interface MemberCardProps {
  member: Member;
}

// Card de integrante, usado na listagem (Integrantes). Além do link
// para GitHub/LinkedIn (que já existiam no protótipo), adicionamos o
// botão "Ver perfil", que usa useNavigate para levar até a rota
// dinâmica /integrantes/:id (IntegranteDetalhe) — é a peça nova pedida
// pela Sprint 3 que não existia no HTML original.
export function MemberCard({ member }: MemberCardProps) {
  const navigate = useNavigate();

  return (
    <Card>
      <img
        className="w-[104px] h-[104px] mb-4 border-[3px] border-surface-strong rounded-full object-cover"
        src={member.photo}
        alt={`Foto de ${member.name}`}
      />
      <h2 className="text-xl">{member.name}</h2>
      <p>
        <strong>RM:</strong> {member.rm}
      </p>
      <strong>Turma: {member.turma}</strong>

      <div className="flex flex-wrap gap-2 mt-3.5">
        <a href={member.github} target="_blank" rel="noreferrer" className="px-2.5 py-2 border border-border rounded-lg text-primary-dark font-extrabold">
          GitHub
        </a>
        <a href={member.linkedin} target="_blank" rel="noreferrer" className="px-2.5 py-2 border border-border rounded-lg text-primary-dark font-extrabold">
          LinkedIn
        </a>
        <button
          type="button"
          onClick={() => navigate(`/integrantes/${member.id}`)}
          className="px-2.5 py-2 border border-border rounded-lg text-primary-dark font-extrabold cursor-pointer"
        >
          Ver perfil
        </button>
      </div>
    </Card>
  );
}
