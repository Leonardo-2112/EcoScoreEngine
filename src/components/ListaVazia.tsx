import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import { Link } from "react-router-dom";

interface ListaVaziaProps {
  mensagem: string;
  linkTexto: string;
  linkPara: string;
  icone?: LucideIcon;
}

// Estado vazio: ícone + mensagem + link de volta (padrão do carrinho vazio do NexStore).
export function ListaVazia({ mensagem, linkTexto, linkPara, icone: Icone = Inbox }: ListaVaziaProps) {
  return (
    <div className="card px-4 py-10 text-center">
      <Icone size={36} className="mx-auto mb-3 text-primary-line" aria-hidden="true" />
      <p className="mb-4 text-sm text-muted">{mensagem}</p>
      <Link to={linkPara} className="text-sm font-bold text-primary-dark underline underline-offset-2">
        {linkTexto}
      </Link>
    </div>
  );
}
