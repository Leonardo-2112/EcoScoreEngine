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
