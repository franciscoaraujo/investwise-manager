import { Plus, Search, Filter, Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Fundo, FundoResponse } from "@/domain/fundos/types";
import FundosList from "./components/FundosList";
import EditFundoDialog from "./components/EditFundoDialog";
import { cn } from "@/lib/utils";
import { useFundos } from "@/application/hooks/useFundos";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FundosIndex = () => {
  const isMobile = useIsMobile();

  const { fundos, loading, error, updateFundo, deleteFundo } = useFundos();

  const [searchTerm, setSearchTerm] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [editForm, setEditForm] = useState<Fundo>({
    idFundo: 0,
    nome: "",
    cnpj: "",
    tipo: "ABERTO",
    dataConstituicao: "",
    status: "ATIVO",
  });

  const startEditing = (fundo: FundoResponse) => {
    setEditForm({ ...fundo });
    setIsDialogOpen(true);
  };

  const saveChanges = async (updatedFundo: Fundo) => {
    if (updatedFundo.idFundo) {
      await updateFundo(updatedFundo.idFundo, updatedFundo);
      setIsDialogOpen(false);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteFundo(id);
  };

  // Filter fundos based on search term
  const filteredFundos = fundos.filter(
    (fundo) =>
      fundo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fundo.cnpj.includes(searchTerm)
  );

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div
          className={cn(
            "flex gap-4",
            isMobile ? "flex-col" : "justify-between items-center"
          )}
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Fundos</h1>
            <p className="text-muted-foreground mt-2">
              Gerenciamento de fundos FIDC
            </p>
          </div>
          <Link to="/fundos/novo">
            <Button className="flex items-center gap-2 w-full md:w-auto justify-center transition-all hover:scale-105">
              <Plus size={16} />
              {isMobile ? "Novo" : "Novo Fundo"}
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por nome ou CNPJ..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filtros
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <FundosList
            fundos={filteredFundos}
            onEdit={startEditing}
            onDelete={handleDelete}
          />
        )}

        <EditFundoDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={saveChanges}
          initialData={editForm}
        />
      </div>
    </Layout>
  );
};

export default FundosIndex;
