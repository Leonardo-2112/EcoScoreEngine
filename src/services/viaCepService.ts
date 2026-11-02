import type { EnderecoViaCep } from "../types/api";

// API pública externa ViaCEP: preenche logradouro, cidade e UF no cadastro.
export async function buscarCep(cep: string): Promise<EnderecoViaCep> {
  const digitos = cep.replace(/\D/g, "");
  let response: Response;
  try {
    response = await fetch(`https://viacep.com.br/ws/${digitos}/json/`);
  } catch {
    throw new Error("Não foi possível consultar o CEP agora. Preencha o endereço manualmente.");
  }
  if (!response.ok) {
    throw new Error("CEP inválido.");
  }
  const endereco = (await response.json()) as EnderecoViaCep;
  // O ViaCEP responde 200 com {"erro": true} quando o CEP não existe
  if (endereco.erro) {
    throw new Error("CEP não encontrado.");
  }
  return endereco;
}
