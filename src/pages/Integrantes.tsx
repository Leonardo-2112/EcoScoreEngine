import { members } from "../data/members";
import { MemberCard } from "../components/MemberCard";
import { Footer } from "../components/Footer";

export function Integrantes() {
  return (
    <>
      <section className="pt-[72px] pb-11 bg-surface-strong">
        <div className="w-[min(100%-32px,1160px)] mx-auto">
          <p className="mb-3.5 text-accent text-sm font-black uppercase">Equipe</p>
          <h1 className="text-[clamp(2.2rem,6vw,4.9rem)] leading-[1.08] max-w-[14ch] text-primary-dark">
            Integrantes
          </h1>
        </div>
      </section>

      <section className="py-[76px]">
        <div className="w-[min(100%-32px,1160px)] mx-auto grid gap-4.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/*
            .map() com key (Aula 4). Cada MemberCard leva ao detalhe via
            useNavigate — a rota dinâmica pedida pela Sprint 3.
          */}
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      <Footer
        description="Equipe responsável pelo protótipo frontend."
        columns={[
          { title: "Navegação", links: [{ to: "/", label: "Início" }, { to: "/sobre", label: "Sobre" }, { to: "/app", label: "App" }] },
          { title: "Projeto", links: [{ to: "/faq", label: "FAQ" }, { to: "/contato", label: "Contato" }] },
        ]}
      />
    </>
  );
}
