interface FlowStepProps {
  title: string;
  description: string;
}
 
// Substitui a classe ".flow-step" da seção "Como funciona" da Home.
export function FlowStep({ title, description }: FlowStepProps) {
  return (
    <article className="min-h-[120px] p-4 border border-border rounded-lg bg-surface">
      <strong>{title}</strong>
      <p className="text-muted">{description}</p>
    </article>
  );
}