// Validações do cadastro ampliado (docs/regras-negocio.md, seção 3.2).

// Formato de e-mail usado nos formulários de login e cadastro
export const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function somenteDigitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

// CPF com 11 dígitos e dígitos verificadores válidos
export function validarCpf(valor: string): boolean {
  const cpf = somenteDigitos(valor);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const digito = (tamanho: number): number => {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) {
      soma += Number(cpf[i]) * (tamanho + 1 - i);
    }
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  return digito(9) === Number(cpf[9]) && digito(10) === Number(cpf[10]);
}

// DDD + número: 10 ou 11 dígitos
export function validarTelefone(valor: string): boolean {
  const telefone = somenteDigitos(valor);
  return telefone.length === 10 || telefone.length === 11;
}

// CEP com 8 dígitos
export function validarCep(valor: string): boolean {
  return somenteDigitos(valor).length === 8;
}

// Nome com pelo menos 2 palavras (nome e sobrenome)
export function validarNomeCompleto(valor: string): boolean {
  return /^\S+(\s+\S+)+$/.test(valor.trim());
}

// Idade mínima (16 anos no cadastro). A data vem do input date: "2008-05-20"
export function temIdadeMinima(data: string, idadeMinima = 16): boolean {
  if (!data) return false;
  const nascimento = new Date(`${data}T00:00:00`);
  if (Number.isNaN(nascimento.getTime())) return false;
  const limite = new Date();
  limite.setFullYear(limite.getFullYear() - idadeMinima);
  return nascimento <= limite;
}
