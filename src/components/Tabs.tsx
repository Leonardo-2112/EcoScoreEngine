import { useState } from "react";
import { Card } from "./Card";

interface TabItem {
  id: string;
  label: string;
  title: string;
  description: string;
}

interface TabsProps {
  items: TabItem[];
}

// Substitui o setupTabs() do main.js original (que usava classList
// para trocar o botão/painel ativo). Aqui o "ativo" é só um useState
// com o id da aba atual — o mesmo padrão de estado local já usado
// no useState do carrinho (Aula 4).
export function Tabs({ items }: TabsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const active = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-[18px]" role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className={`border rounded-lg px-3.5 py-2.5 font-extrabold cursor-pointer ${
              item.id === activeId
                ? "bg-primary border-primary text-white"
                : "bg-surface border-border text-text"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {active && (
        <Card>
          <h3 className="mb-2.5">{active.title}</h3>
          <p className="text-muted">{active.description}</p>
        </Card>
      )}
    </div>
  );
}
