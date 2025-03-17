import { FundoResponse } from "@/domain/fundos/types";
import FundoCard from "./FundoCard";

interface FundosListProps {
  fundos: FundoResponse[];
  onEdit: (fundo: FundoResponse) => void;
  onDelete: (id: number) => void;
}

const FundosList = ({ fundos, onEdit, onDelete }: FundosListProps) => {
  console.log("fundos", fundos);

  if (fundos.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg bg-card">
        <p className="text-muted-foreground">Nenhum fundo encontrado</p>
      </div>
    );
  }

  return (
    <div className="responsive-grid">
      {fundos.map((fundo) => (
        <FundoCard
          key={fundo.idFundo}
          fundo={fundo}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default FundosList;
