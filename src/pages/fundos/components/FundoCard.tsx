import { Card } from "@/components/ui/card";
import { FileText, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { FundoResponse } from "@/domain/fundos/types";
import { cn } from "@/lib/utils";

interface FundoCardProps {
  fundo: FundoResponse;
  onEdit: (fundo: FundoResponse) => void;
  onDelete: (id: number) => void;
}

const FundoCard = ({ fundo, onEdit, onDelete }: FundoCardProps) => {
  const isMobile = useIsMobile();

  return (
    <Card
      key={fundo.idFundo}
      className="p-4 md:p-6 hover-card-effect animate-fade-in"
    >
      <div
        className={cn(
          "flex gap-4",
          isMobile ? "flex-col" : "justify-between items-start"
        )}
      >
        <div className="flex-1">
          <h3 className="text-xl font-semibold line-clamp-1">{fundo.nome}</h3>
          <p className="text-muted-foreground mt-1">CNPJ: {fundo.cnpj}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
              {fundo.tipo}
            </span>
            <span className="text-sm bg-green-500/10 text-green-600 px-3 py-1 rounded-full">
              {fundo.status}
            </span>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Data de Constituição:{" "}
            {new Date(fundo.dataConstituicao).toLocaleDateString("pt-BR")}
          </div>
        </div>
        <div
          className={cn("flex items-center gap-2", isMobile ? "self-end" : "")}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(fundo)}
            className="hover:bg-primary/10 transition-colors"
          >
            <Edit size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(fundo.idFundo)}
            className="hover:bg-destructive/10 transition-colors"
          >
            <Trash size={16} />
          </Button>
          <div className="p-3 bg-primary/10 rounded-full">
            <FileText size={20} className="text-primary" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FundoCard;
