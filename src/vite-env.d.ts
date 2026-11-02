/// <reference types="vite/client" />

// Tipagem das variáveis de ambiente lidas com import.meta.env.
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
