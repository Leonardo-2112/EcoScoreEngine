import { useEffect } from "react";

// Atualiza o título da aba do navegador sempre que a página muda.
export function useDocumentTitle(titulo: string): void {
  useEffect(() => {
    document.title = `${titulo} | EcoScore Engine`;
  }, [titulo]);
}
