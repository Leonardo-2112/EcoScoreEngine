import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

// Substitui a classe ".card" do style.css original. É usado em praticamente
// toda página (Home, Sobre, App, Empresas, Integrantes, FAQ, Contato) —
// exatamente o tipo de componente que o Bloco 2 da Sprint 3 pede
// (componente reutilizável, reaproveitado em vários lugares).
export function Card({ children, className = "" }: CardProps) {
  return (
    <article
      className={`border border-border rounded-lg bg-surface shadow-[0_8px_24px_rgba(26,52,37,0.06)] p-[22px] ${className}`}
    >
      {children}
    </article>
  );
}