import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  to?: string; // rota interna (usa Link do react-router-dom)
  href?: string; // link externo (usa <a>)
  type?: "button" | "submit";
  onClick?: () => void;
}

// Componente reutilizável de botão. Concentra as classes que antes
// ficavam em ".btn", ".btn-primary" e ".btn-secondary" no style.css.
// Reaproveitado no Hero da Home, nas ações de cada card de detalhe e no
// formulário de Contato (variant="primary" + type="submit").
export function Button({ children, variant = "primary", to, href, type = "button", onClick }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg font-extrabold cursor-pointer transition-transform hover:-translate-y-0.5 border";

  const variants = {
    primary: "bg-primary text-white border-transparent shadow-[0_10px_22px_rgba(22,122,88,0.24)]",
    secondary: "bg-surface text-primary-dark border-border",
  };

  const className = `${base} ${variants[variant]}`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
