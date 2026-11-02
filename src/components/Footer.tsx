import { Link } from "react-router-dom";

interface FooterLink {
  to: string;
  label: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  description: string;
  columns: [FooterColumn, FooterColumn]; // sempre 2 colunas, igual ao original
}

// Footer reutilizável (Bloco 2). Cada página original tinha um texto de
// descrição e dois grupos de links diferentes no rodapé — em vez de
// duplicar o componente 7 vezes, ele recebe esse conteúdo por props.
export function Footer({ description, columns }: FooterProps) {
  return (
    <footer className="py-9 bg-[#13231b] text-[#edf4ee]">
      <div className="w-[min(100%-32px,1160px)] mx-auto grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-6">
        <div>
          <strong>EcoScore Engine</strong>
          <p className="text-[#cfe2d4]">{description}</p>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="grid gap-2">
            <strong>{column.title}</strong>
            {column.links.map((link) => (
              <Link key={link.to} to={link.to} className="text-[#cfe2d4]">
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
