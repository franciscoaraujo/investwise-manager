
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Edit, Trash } from "lucide-react";
import { Operacao, formatarTipo, formatarValor } from "../types";

interface OperacaoCardProps {
  operacao: Operacao;
  onEdit: (operacao: Operacao) => void;
  onDelete: (id: number) => void;
  isMobile: boolean;
}

const OperacaoCard = ({ operacao, onEdit, onDelete, isMobile }: OperacaoCardProps) => {
  return (
    <Card key={operacao.idOperacao} className="p-4 md:p-6 hover:shadow-md transition-shadow">
      <div className={`${isMobile ? 'flex flex-col space-y-4' : 'flex justify-between items-start'}`}>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xl font-semibold">{formatarTipo(operacao.tipo)}</h3>
            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
              {formatarValor(operacao.valor)}
            </span>
          </div>
          <p className="text-gray-500 mt-1">Fundo: {operacao.nomeFundo}</p>
          {operacao.nomeCotista && (
            <p className="text-gray-500">Cotista: {operacao.nomeCotista}</p>
          )}
        </div>
        <div className={`flex items-center gap-2 ${isMobile ? 'self-end' : ''}`}>
          <Button variant="ghost" size="icon" onClick={() => onEdit(operacao)}>
            <Edit size={16} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(operacao.idOperacao)}>
            <Trash size={16} />
          </Button>
          <div className="p-3 bg-primary/10 rounded-full">
            <Activity size={20} className="text-primary" />
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Data: {new Date(operacao.dataOperacao).toLocaleString('pt-BR')}
      </div>
    </Card>
  );
};

export default OperacaoCard;
