
export type Fundo = {
  idFundo: number;
  nome: string;
  cnpj: string;
  tipo: "ABERTO" | "FECHADO";
  dataConstituicao: string;
  status: "ATIVO" | "INATIVO";
}
