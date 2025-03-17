// Domain models for Fundos (Funds)
export interface Fundo {
  idFundo?: number;
  nome: string;
  cnpj: string;
  tipo: "ABERTO" | "FECHADO";
  dataConstituicao: string;
  status: "ATIVO" | "INATIVO";
}

// API response types
export interface ApiError {
  erro: string;
}

export interface FundoResponse extends Fundo {
  idFundo: number;
}

export interface FundosResponse {
  content: FundoResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
