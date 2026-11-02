import type { ReactNode } from "react";
import { Container } from "./Container";

interface PageHeroProps {
  eyebrow: string;
  titulo: string;
  descricao: ReactNode;
  children?: ReactNode;
}

// Cabeçalho das páginas institucionais (feedback da Sprint 3: extrair o
// bloco "eyebrow + título + texto" que se repetia em Sobre, FAQ, Contato...).
export function PageHero({ eyebrow, titulo, descricao, children }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-surface-strong py-12 md:py-16 xl:py-20">
      <Container>
        <p className="mb-3 text-sm font-black uppercase tracking-wide text-primary">{eyebrow}</p>
        <h1 className="max-w-[20ch] font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-primary-dark xl:text-6xl">
          {titulo}
        </h1>
        <div className="mt-4 max-w-3xl text-base text-muted md:text-lg xl:text-xl">{descricao}</div>
        {children}
      </Container>
    </section>
  );
}
