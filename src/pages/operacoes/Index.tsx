
import { Plus } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Operacao } from "./types";
import OperacoesList from "./components/OperacoesList";
import EditOperacaoDialog from "./components/EditOperacaoDialog";

const OperacoesIndex = () => {
  const isMobile = useIsMobile();
  const [operacoes, setOperacoes] = useState<Operacao[]>([
    {
      idOperacao: 1,
      tipo: "CESSAO",
      idFundo: 1,
      nomeFundo: "Fundo de Investimento Teste",
      idCotista: null,
      nomeCotista: null,
      idDireito: 1,
      valor: 9500.00,
      dataOperacao: "2025-03-12T10:00:00"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<Operacao>({
    idOperacao: 0,
    tipo: "CESSAO",
    idFundo: 0,
    nomeFundo: "",
    idCotista: null,
    nomeCotista: null,
    idDireito: 0,
    valor: 0,
    dataOperacao: ""
  });

  const startEditing = (operacao: Operacao) => {
    setEditForm({...operacao});
    setIsDialogOpen(true);
  };

  const saveChanges = (updatedOperacao: Operacao) => {
    setOperacoes(operacoes.map(o => 
      o.idOperacao === updatedOperacao.idOperacao 
        ? updatedOperacao
        : o
    ));
    
    setIsDialogOpen(false);
    toast.success("Operação atualizada com sucesso!");
  };

  const deleteOperacao = (id: number) => {
    setOperacoes(operacoes.filter(o => o.idOperacao !== id));
    toast.success("Operação removida com sucesso!");
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className={`${isMobile ? 'flex flex-col space-y-4' : 'flex justify-between items-center'}`}>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Operações</h1>
            <p className="text-gray-500 mt-2">Gerenciamento de operações</p>
          </div>
          <Link to="/operacoes/nova">
            <Button className="flex items-center gap-2 w-full md:w-auto justify-center">
              <Plus size={16} />
              {isMobile ? "Nova" : "Nova Operação"}
            </Button>
          </Link>
        </div>

        <OperacoesList 
          operacoes={operacoes}
          onEdit={startEditing}
          onDelete={deleteOperacao}
          isMobile={isMobile}
        />

        <EditOperacaoDialog 
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={saveChanges}
          initialData={editForm}
        />
      </div>
    </Layout>
  );
};

export default OperacoesIndex;
