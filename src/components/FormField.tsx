import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  children: ReactNode; // o <input> (ou <select>) com a classe .field
  ajuda?: string; // texto cinza abaixo do campo ("Mínimo de 6 caracteres.")
  erro?: string;
  className?: string;
}

// Rótulo + campo + ajuda/erro, como nos formulários do protótipo.
// O input recebe id={id} e aria-describedby={`${id}-info`}.
export function FormField({ id, label, children, ajuda, erro, className = "" }: FormFieldProps) {
  return (
    <div className={`grid gap-1 ${className}`}>
      <label htmlFor={id} className="text-xs font-bold text-primary-dark">
        {label}
      </label>
      {children}
      {erro ? (
        <p id={`${id}-info`} role="alert" className="text-xs font-semibold text-danger">
          {erro}
        </p>
      ) : (
        ajuda && (
          <p id={`${id}-info`} className="text-xs text-muted">
            {ajuda}
          </p>
        )
      )}
    </div>
  );
}
