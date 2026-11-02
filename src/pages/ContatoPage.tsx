import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { PageHero } from "../components/PageHero";
import { Footer } from "../components/Footer";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

// Tipagem dos campos do formulário — o React Hook Form usa essa
// interface para saber o "shape" dos dados que o useForm vai controlar.
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const assuntos: string[] = ["Campanha ESG", "Dúvidas sobre o projeto", "Parceria acadêmica"];

export function ContatoPage() {
  useDocumentTitle("Contato");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  // Estado simples pra mostrar a mensagem de sucesso, igual ao
  // "#formNotice" do protótipo original.
  const [submitted, setSubmitted] = useState(false);

  // Só roda quando o RHF já validou tudo (regras do register).
  // Não há API de contato: o formulário apenas valida e confirma.
  function handleEnviar() {
    setSubmitted(true);
    reset(); // limpa o formulário, igual ao form.reset() do main.js original
  }

  return (
    <>
      <PageHero
        eyebrow="Fale com a equipe"
        titulo="Contato"
        descricao="Formulário com validação via React Hook Form, mantendo o mesmo feedback visual e bloqueio de envio inválido do protótipo original."
      />

      <section className="py-14 md:py-[76px] xl:py-24">
        <Container className="grid grid-cols-1 gap-4.5 md:grid-cols-2 lg:grid-cols-[3fr_2fr] xl:gap-8">
          <Card className="xl:p-8">
            <h2 className="mb-4 font-display text-xl md:text-2xl xl:text-3xl">Enviar mensagem</h2>

            {/* handleSubmit(handleEnviar) troca o onSubmit + preventDefault manual */}
            <form onSubmit={handleSubmit(handleEnviar)} className="grid gap-4 xl:gap-5" noValidate>
              <label className="grid gap-1.5 font-extrabold">
                Nome
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="field min-h-[44px] font-normal xl:text-base"
                  aria-invalid={errors.name ? "true" : "false"}
                  // "required" replica a checagem de campo vazio do JS original
                  {...register("name", { required: "Preencha este campo." })}
                />
                {errors.name && <span className="text-sm font-normal text-danger">{errors.name.message}</span>}
              </label>

              <label className="grid gap-1.5 font-extrabold">
                E-mail
                <input
                  type="email"
                  placeholder="voce@email.com"
                  className="field min-h-[44px] font-normal xl:text-base"
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email", {
                    required: "Preencha este campo.",
                    // mesmo regex usado no main.js original para validar o formato do e-mail
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Informe um e-mail válido.",
                    },
                  })}
                />
                {errors.email && <span className="text-sm font-normal text-danger">{errors.email.message}</span>}
              </label>

              <label className="grid gap-1.5 font-extrabold">
                Assunto
                <select className="field min-h-[44px] font-normal xl:text-base" {...register("subject")}>
                  {assuntos.map((assunto) => (
                    <option key={assunto}>{assunto}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-1.5 font-extrabold">
                Mensagem
                <textarea
                  placeholder="Escreva sua mensagem"
                  className="field min-h-[132px] resize-y font-normal xl:min-h-[160px] xl:text-base"
                  aria-invalid={errors.message ? "true" : "false"}
                  {...register("message", { required: "Preencha este campo." })}
                />
                {errors.message && <span className="text-sm font-normal text-danger">{errors.message.message}</span>}
              </label>

              <Button type="submit" variant="primary">
                Enviar mensagem
              </Button>

              {submitted && (
                <p role="status" className="mt-3.5 rounded-lg bg-surface-strong p-3.5 font-extrabold text-primary-dark">
                  Mensagem registrada. Em produção, ela seria enviada para a equipe.
                </p>
              )}
            </form>
          </Card>

          <Card className="self-start xl:p-8">
            <h2 className="mb-4 font-display text-xl md:text-2xl xl:text-3xl">Informações</h2>
            <p className="text-muted">Projeto acadêmico desenvolvido pela equipe GaiaTech para o Challenge SoulUp/FIAP 2026.</p>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-3">
              <span>E-mail</span>
              <strong className="break-all">ecoscore@fiap.com.br</strong>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-3">
              <span>Turma</span>
              <strong>1TDSPV</strong>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 py-3">
              <span>Repositório</span>
              <strong>
                <a
                  href="https://github.com/Leonardo-2112/EcoScoreEngine"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-dark underline underline-offset-2"
                >
                  EcoScoreEngine
                </a>
              </strong>
            </div>
          </Card>
        </Container>
      </section>

      <Footer
        description="Contato e validação de formulário."
        columns={[
          {
            title: "Navegação",
            links: [
              { to: "/", label: "Início" },
              { to: "/sobre", label: "Sobre" },
              { to: "/faq", label: "FAQ" },
            ],
          },
          {
            title: "Plataforma",
            links: [
              { to: "/cadastro", label: "Cadastrar-se" },
              { to: "/login", label: "Entrar" },
              { to: "/integrantes", label: "Integrantes" },
            ],
          },
        ]}
      />
    </>
  );
}
