import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  // "site": largura das páginas institucionais (landing, sobre, FAQ...)
  // "tela": coluna centralizada das telas do protótipo (que é mobile)
  variante?: "site" | "tela";
  className?: string;
}

const larguras = {
  site: "w-[min(100%-32px,1160px)] xl:w-[min(100%-64px,1280px)]",
  tela: "w-full max-w-md px-4 py-6 sm:max-w-lg sm:py-8 md:max-w-xl md:py-10 lg:max-w-2xl xl:max-w-3xl",
};

// Centraliza o conteúdo com largura máxima. Substitui o
// "w-[min(100%-32px,1160px)] mx-auto" que se repetia em toda página da Sprint 3.
export function Container({ children, variante = "site", className = "" }: ContainerProps) {
  return <div className={`mx-auto ${larguras[variante]} ${className}`}>{children}</div>;
}
