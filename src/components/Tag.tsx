interface TagProps {
  children: string;
}

// Substitui a classe ".tag", usada nos cards de roadmap da página Sobre.
export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-strong text-primary-dark text-xs font-extrabold">
      {children}
    </span>
  );
}
