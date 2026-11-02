import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, UserX } from "lucide-react";
import { members } from "../data/members";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { ListaVazia } from "../components/ListaVazia";
import { PageHero } from "../components/PageHero";
import { Footer } from "../components/Footer";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

// Rota dinâmica /integrantes/:id (critério de rota dinâmica +
// useNavigate/useParams). O integrante é buscado na lista
// (src/data/members.ts) a partir do "id" da URL — por isso usamos
// useParams sozinho, sem precisar de useLocation.
export function IntegranteDetalhePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const member = members.find((item) => item.id === id);

  // O hook fica antes do "return" antecipado (regra dos hooks).
  useDocumentTitle(member ? member.name : "Integrante não encontrado");

  // useNavigate: volta uma página no histórico, sem precisar saber a rota exata
  function handleVoltar() {
    navigate(-1);
  }

  if (!member) {
    return (
      <section className="py-14 md:py-[76px] xl:py-24">
        <Container className="max-w-xl xl:max-w-2xl">
          <ListaVazia
            mensagem="Integrante não encontrado."
            linkTexto="Voltar para integrantes"
            linkPara="/integrantes"
            icone={UserX}
          />
        </Container>
      </section>
    );
  }

  return (
    <>
      <PageHero eyebrow="Perfil do integrante" titulo={member.name} descricao={`Equipe GaiaTech · Turma ${member.turma}`} />

      <section className="py-14 md:py-[76px] xl:py-24">
        <Container>
          <Card className="mx-auto max-w-[520px] sm:flex sm:items-start sm:gap-6 lg:max-w-[640px] xl:max-w-[720px] xl:gap-8 xl:p-10">
            <img
              className="mb-5 h-[140px] w-[140px] shrink-0 rounded-full border-[3px] border-surface-strong object-cover sm:mb-0 xl:h-[180px] xl:w-[180px]"
              src={member.photo}
              alt={`Foto de ${member.name}`}
            />

            <div>
              <h2 className="text-xl xl:text-2xl">{member.name}</h2>
              <p>
                <strong>RM:</strong> {member.rm}
              </p>
              <strong>Turma: {member.turma}</strong>

              <div className="mt-3.5 flex flex-wrap gap-2">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-border px-2.5 py-2 font-extrabold text-primary-dark"
                >
                  GitHub
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-border px-2.5 py-2 font-extrabold text-primary-dark"
                >
                  LinkedIn
                </a>
              </div>

              <button
                type="button"
                onClick={handleVoltar}
                className="mt-5 inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 font-extrabold text-primary-dark"
              >
                <ArrowLeft size={18} aria-hidden="true" />
                Voltar
              </button>
            </div>
          </Card>
        </Container>
      </section>

      <Footer
        description="Equipe GaiaTech, responsável pelo EcoScore Engine."
        columns={[
          {
            title: "Navegação",
            links: [
              { to: "/", label: "Início" },
              { to: "/integrantes", label: "Integrantes" },
            ],
          },
          {
            title: "Projeto",
            links: [
              { to: "/faq", label: "FAQ" },
              { to: "/contato", label: "Contato" },
            ],
          },
        ]}
      />
    </>
  );
}
