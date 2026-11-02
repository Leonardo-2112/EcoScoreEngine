import { members } from "../data/members";
import { Container } from "../components/Container";
import { MemberCard } from "../components/MemberCard";
import { PageHero } from "../components/PageHero";
import { Footer } from "../components/Footer";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function IntegrantesPage() {
  useDocumentTitle("Integrantes");

  return (
    <>
      <PageHero
        eyebrow="Equipe GaiaTech"
        titulo="Integrantes"
        descricao="Os 5 integrantes da turma 1TDSPV responsáveis pelo EcoScore Engine. Clique em “Ver perfil” para abrir a página de cada um."
      />

      <section className="py-14 md:py-[76px] xl:py-24">
        <Container className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-5">
          {/*
            .map() com key (Aula 4). Cada MemberCard leva ao detalhe via
            useNavigate — a rota dinâmica /integrantes/:id.
          */}
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </Container>
      </section>

      <Footer
        description="Equipe GaiaTech, responsável pelo EcoScore Engine."
        columns={[
          {
            title: "Navegação",
            links: [
              { to: "/", label: "Início" },
              { to: "/sobre", label: "Sobre" },
              { to: "/cadastro", label: "Cadastrar-se" },
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
