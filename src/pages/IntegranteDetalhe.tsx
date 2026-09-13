import { useNavigate, useParams } from "react-router-dom";
import { members } from "../data/members";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";

// Página nova, pedida pela Sprint 3 para cumprir o critério de rota
// dinâmica + useNavigate/useParams (Bloco 3), já que o protótipo
// original não tinha nenhuma página de detalhe.
//
// Diferença para o exemplo da Aula 6 (WorkoutDetails): lá o dado vinha
// pelo "state" do Link/useLocation. Aqui buscamos o integrante na lista
// (src/data/members.ts) a partir do "id" da URL — por isso usamos
// useParams sozinho, sem precisar de useLocation.
export function IntegranteDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const member = members.find((item) => item.id === id);

  if (!member) {
    return (
      <section className="py-[76px]">
        <div className="w-[min(100%-32px,1160px)] mx-auto">
          <p className="text-muted">Integrante não encontrado.</p>
          <div className="mt-4">
            <Button variant="secondary" to="/integrantes">
              Voltar para Integrantes
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-[72px] pb-11 bg-surface-strong">
        <div className="w-[min(100%-32px,1160px)] mx-auto">
          <p className="mb-3.5 text-accent text-sm font-black uppercase">Perfil do integrante</p>
          <h1 className="text-[clamp(2.2rem,6vw,4.9rem)] leading-[1.08] max-w-[14ch] text-primary-dark">
            {member.name}
          </h1>
        </div>
      </section>

      <section className="py-[76px]">
        <div className="w-[min(100%-32px,1160px)] mx-auto max-w-[520px]">
          <Card>
            <img
              className="w-[140px] h-[140px] mb-5 border-[3px] border-surface-strong rounded-full object-cover"
              src={member.photo}
              alt={`Foto de ${member.name}`}
            />
            <h2 className="text-xl">{member.name}</h2>
            <p>
              <strong>RM:</strong> {member.rm}
            </p>
            <strong>Turma: {member.turma}</strong>

            <div className="flex flex-wrap gap-2 mt-3.5">
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-2 border border-border rounded-lg text-primary-dark font-extrabold"
              >
                GitHub
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-2 border border-border rounded-lg text-primary-dark font-extrabold"
              >
                LinkedIn
              </a>
            </div>

            {/* useNavigate: volta uma página no histórico, sem precisar saber a rota exata */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-5 inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg font-extrabold cursor-pointer border border-border bg-surface text-primary-dark"
            >
              ← Voltar
            </button>
          </Card>
        </div>
      </section>

      <Footer
        description="Equipe responsável pelo protótipo frontend."
        columns={[
          { title: "Navegação", links: [{ to: "/", label: "Início" }, { to: "/integrantes", label: "Integrantes" }] },
          { title: "Projeto", links: [{ to: "/faq", label: "FAQ" }, { to: "/contato", label: "Contato" }] },
        ]}
      />
    </>
  );
}
