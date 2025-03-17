
export type Operacao = {
  idOperacao: number;
  tipo: "CESSAO" | "AQUISICAO" | "VENDA";
  idFundo: number;
  nomeFundo: string;
  idCotista: number | null;
  nomeCotista: string | null;
  idDireito: number;
  valor: number;
  dataOperacao: string;
}

export const formatarTipo = (tipo: string) => {
  switch (tipo) {
    case "CESSAO":
      return "Cessão";
    case "AQUISICAO":
      return "Aquisição";
    case "VENDA":
      return "Venda";
    default:
      return tipo;
  }
};

export const formatarValor = (valor: number) => {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};
