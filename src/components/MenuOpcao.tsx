import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface MenuOpcaoProps {
  icone: LucideIcon;
  titulo: string;
  descricao: string;
  to?: string; // navega para uma rota
  onClick?: () => void; // ou executa uma ação ("Sair da conta")
  variante?: "destaque" | "neutro";
}

const variantes = {
  destaque: "border-primary-line bg-primary-light hover:border-primary",
  neutro: "border-border bg-surface hover:border-primary-line",
};

// Cartão da tela 05: ícone num quadrado branco, título e descrição.
export function MenuOpcao({ icone: Icone, titulo, descricao, to, onClick, variante = "destaque" }: MenuOpcaoProps) {
  const className = `flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition focus-visible:outline-2 focus-visible:outline-primary ${variantes[variante]}`;

  const conteudo = (
    <>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-surface text-primary-dark shadow-sm">
        <Icone size={18} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-bold text-primary-dark">{titulo}</span>
        <span className="block text-xs text-muted">{descricao}</span>
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={className}>
        {conteudo}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {conteudo}
    </button>
  );
}
