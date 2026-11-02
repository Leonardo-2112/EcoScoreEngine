interface TituloTelaProps {
  titulo: string;
  subtitulo?: string;
}

// Título verde e subtítulo cinza do topo de cada tela do protótipo
// ("Entrar", "O que deseja fazer?", "Escolha a ação"...).
export function TituloTela({ titulo, subtitulo }: TituloTelaProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-primary-dark md:text-3xl">{titulo}</h1>
      {subtitulo && <p className="mt-1 text-sm text-muted md:text-base">{subtitulo}</p>}
    </div>
  );
}
