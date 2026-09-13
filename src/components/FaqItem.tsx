import { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

// Substitui o setupFaq() do main.js original (classList.toggle("open")).
// O estado de aberto/fechado agora é useState local de cada item, no
// mesmo padrão do toggle do menu no Header.
export function FaqItem({ question, answer, defaultOpen = false }: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <article className="border border-border rounded-lg bg-surface overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full min-h-[58px] border-0 bg-transparent px-[18px] py-4 text-text font-black text-left cursor-pointer"
      >
        {question}
      </button>
      {open && <div className="px-[18px] pb-[18px] text-muted">{answer}</div>}
    </article>
  );
}
