
import { Operacao } from "../types";
import OperacaoCard from "./OperacaoCard";

interface OperacoesListProps {
  operacoes: Operacao[];
  onEdit: (operacao: Operacao) => void;
  onDelete: (id: number) => void;
  isMobile: boolean;
}

const OperacoesList = ({ operacoes, onEdit, onDelete, isMobile }: OperacoesListProps) => {
  return (
    <div className="space-y-4">
      {operacoes.map((operacao) => (
        <OperacaoCard 
          key={operacao.idOperacao}
          operacao={operacao}
          onEdit={onEdit}
          onDelete={onDelete}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
};

export default OperacoesList;
