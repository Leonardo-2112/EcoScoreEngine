import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Leaf } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { primeiroNome } from "../utils/formatadores";

// Links das páginas institucionais (visitante sem login)
const links = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/integrantes", label: "Integrantes" },
  { to: "/faq", label: "FAQ" },
  { to: "/contato", label: "Contato" },
];

type IsActive = { isActive: boolean };

const linkClass = ({ isActive }: IsActive): string =>
  `px-3 py-2.5 rounded-lg text-[0.95rem] font-bold ${
    isActive ? "bg-surface-strong text-primary-dark" : "text-muted hover:bg-surface-strong hover:text-primary-dark"
  }`;

// Logo "EcoScoreEngine" do protótipo: folha num círculo + nome
function Logo({ claro }: { claro: boolean }) {
  return (
    <>
      <span
        className={`grid h-8 w-8 place-items-center rounded-full ${claro ? "bg-surface text-primary-dark" : "bg-primary-dark text-white"}`}
      >
        <Leaf size={16} aria-hidden="true" />
      </span>
      <span className={claro ? "text-white" : "text-primary-dark"}>
        <strong>EcoScore</strong>
        <span className="font-normal">Engine</span>
      </span>
    </>
  );
}

// Header único, renderizado pelo MainLayout.
// Sem login: links institucionais (NavLink) e os botões Entrar e Cadastrar-se.
// Com login: a barra verde do protótipo, com o link "Menu" e o nome do usuário.
export function Header() {
  const { usuario } = useAuth();
  const [open, setOpen] = useState(false);

  if (usuario) {
    return (
      <header className="sticky top-0 z-20 bg-primary-dark text-white">
        <nav
          className="mx-auto flex min-h-14 w-[min(100%-32px,1160px)] items-center justify-between gap-4 xl:w-[min(100%-64px,1280px)]"
          aria-label="Menu do participante"
        >
          <Link to="/menu" className="inline-flex items-center gap-2">
            <Logo claro />
          </Link>
          <div className="flex items-center gap-1 text-sm sm:gap-3">
            <NavLink
              to="/menu"
              end
              className={({ isActive }: IsActive) =>
                `rounded-md px-2.5 py-1.5 font-semibold transition ${isActive ? "bg-white/15" : "hover:bg-white/10"}`
              }
            >
              Menu
            </NavLink>
            <span className="max-w-[10rem] truncate" title={usuario.nome}>
              {primeiroNome(usuario.nome)}
            </span>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/95 backdrop-blur-md">
      <nav
        className="relative mx-auto flex min-h-[72px] w-[min(100%-32px,1160px)] items-center justify-between gap-4 xl:w-[min(100%-64px,1280px)]"
        aria-label="Menu principal"
      >
        <Link to="/" className="inline-flex items-center gap-2.5 text-lg">
          <Logo claro={false} />
        </Link>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="h-[42px] w-[42px] rounded-lg border border-border bg-surface lg:hidden"
        >
          <span className="mx-auto my-1 block h-0.5 w-[18px] bg-text" />
          <span className="mx-auto my-1 block h-0.5 w-[18px] bg-text" />
          <span className="mx-auto my-1 block h-0.5 w-[18px] bg-text" />
        </button>

        <div
          className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-[72px] flex-col items-stretch gap-1.5 rounded-lg border border-border bg-surface p-3 shadow-[0_18px_48px_rgba(21,50,35,0.12)]
            lg:static lg:flex lg:flex-row lg:items-center lg:gap-1.5 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
        >
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end className={linkClass} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2 lg:mt-0 lg:ml-3 lg:flex">
            <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary lg:w-auto lg:min-h-10 lg:px-4">
              Entrar
            </Link>
            <Link to="/cadastro" onClick={() => setOpen(false)} className="btn-primary lg:w-auto lg:min-h-10 lg:px-4">
              Cadastrar-se
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
