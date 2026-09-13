import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";

// Tipagem dos campos do formulário — o React Hook Form usa essa
// interface para saber o "shape" dos dados que o useForm vai controlar.
interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export function Contato() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>();

    // Estado simples pra mostrar a mensagem de sucesso, igual ao
    // "#formNotice" do protótipo original.
    const [submitted, setSubmitted] = useState(false);

    // Essa função só roda quando o RHF já validou tudo (regras do register).
    function onValid() {
        setSubmitted(true);
        reset(); // limpa o formulário, igual ao form.reset() do main.js original
    }


    return (
    <>
            <section className="pt-[72px] pb-11 bg-surface-strong">
                <div className="w-[min(100%-32px,1160px)] mx-auto">
                    <p className="mb-3.5 text-accent text-sm font-black uppercase">Fale com a equipe</p>
                    <h1 className="text-[clamp(2.2rem,6vw,4.9rem)] leading-[1.08] max-w-[14ch] text-primary-dark">Contato</h1>
                    <p className="max-w-[780px] mt-4.5 text-[clamp(1rem,2vw,1.25rem)]">
                        Formulário com validação via React Hook Form, mantendo o mesmo feedback visual e bloqueio de envio
                        inválido do protótipo original.
                    </p>
                </div>
            </section>

            <section className="py-[76px]">
                <div className="w-[min(100%-32px,1160px)] mx-auto grid gap-4.5 grid-cols-1 sm:grid-cols-2">
                    <Card>
                        <h2 className="mb-4">Enviar mensagem</h2>

                        {/* handleSubmit(onValid) troca o onSubmit + preventDefault manual */}
                        <form onSubmit={handleSubmit(onValid)} className="grid gap-4" noValidate>
                            <label className="grid gap-1.5 font-extrabold">
                                Nome
                                <input
                                    type="text"
                                    placeholder="Seu nome"
                                    className="w-full min-h-[44px] border border-border rounded-lg px-3 bg-surface text-text font-normal"
                                    // "required" replica a checagem de campo vazio do JS original
                                    {...register("name", { required: "Preencha este campo." })}
                                />
                                {errors.name && <span className="text-danger text-sm font-normal">{errors.name.message}</span>}
                            </label>

                            <label className="grid gap-1.5 font-extrabold">
                                E-mail
                                <input
                                    type="email"
                                    placeholder="voce@email.com"
                                    className="w-full min-h-[44px] border border-border rounded-lg px-3 bg-surface text-text font-normal"
                                    {...register("email", {
                                        required: "Preencha este campo.",
                                        // mesmo regex usado no main.js original para validar o formato do e-mail
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Informe um e-mail válido.",
                                        },
                                    })}
                                />
                                {errors.email && <span className="text-danger text-sm font-normal">{errors.email.message}</span>}
                            </label>

                            <label className="grid gap-1.5 font-extrabold">
                                Assunto
                                <select
                                    className="w-full min-h-[44px] border border-border rounded-lg px-3 bg-surface text-text font-normal"
                                    {...register("subject")}
                                >
                                    <option>Campanha ESG</option>
                                    <option>Dúvidas sobre o projeto</option>
                                    <option>Parceria acadêmica</option>
                                </select>
                            </label>

                            <label className="grid gap-1.5 font-extrabold">
                                Mensagem
                                <textarea
                                    placeholder="Escreva sua mensagem"
                                    className="w-full min-h-[132px] border border-border rounded-lg px-3 py-2.5 bg-surface text-text font-normal resize-y"
                                    {...register("message", { required: "Preencha este campo." })}
                                />
                                {errors.message && <span className="text-danger text-sm font-normal">{errors.message.message}</span>}
                            </label>

                            <Button type="submit" variant="primary">
                                Enviar mensagem
                            </Button>

                            {submitted && (
                                <p role="status" className="mt-3.5 p-3.5 rounded-lg bg-surface-strong text-primary-dark font-extrabold">
                                    Mensagem registrada no protótipo. Em produção, ela seria enviada para a equipe.
                                </p>
                            )}
                        </form>
                    </Card>

