
import { Card } from "@/components/ui/card";
import { FileText, Plus, Edit, Trash } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

type Direito = {
  idDireito: number;
  valorNominal: number;
  dataVencimento: string;
  status: "A_VENCER" | "VENCIDO";
  idFundo: number;
  nomeFundo: string;
}

const DireitosIndex = () => {
  const isMobile = useIsMobile();
  const [direitos, setDireitos] = useState<Direito[]>([
    {
      idDireito: 1,
      valorNominal: 10000.00,
      dataVencimento: "2025-12-31",
      status: "A_VENCER",
      idFundo: 1,
      nomeFundo: "Fundo de Investimento Teste"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<Direito>({
    idDireito: 0,
    valorNominal: 0,
    dataVencimento: "",
    status: "A_VENCER",
    idFundo: 0,
    nomeFundo: ""
  });

  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const startEditing = (direito: Direito) => {
    setEditForm({...direito});
    setIsDialogOpen(true);
  };

  const handleEditFormChange = (field: keyof Direito, value: string | number) => {
    setEditForm({...editForm, [field]: value});
  };

  const saveChanges = () => {
    setDireitos(direitos.map(d => 
      d.idDireito === editForm.idDireito 
        ? editForm
        : d
    ));
    
    setIsDialogOpen(false);
    toast.success("Direito Creditório atualizado com sucesso!");
  };

  const deleteDireito = (id: number) => {
    setDireitos(direitos.filter(d => d.idDireito !== id));
    toast.success("Direito Creditório removido com sucesso!");
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className={`${isMobile ? 'flex flex-col space-y-4' : 'flex justify-between items-center'}`}>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Direitos Creditórios</h1>
            <p className="text-gray-500 mt-2">Gerenciamento de direitos creditórios</p>
          </div>
          <Link to="/direitos/novo">
            <Button className="flex items-center gap-2 w-full md:w-auto justify-center">
              <Plus size={16} />
              {isMobile ? "Novo" : "Novo Direito Creditório"}
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {direitos.map((direito) => (
            <Card key={direito.idDireito} className="p-4 md:p-6 hover:shadow-md transition-shadow">
              <div className={`${isMobile ? 'flex flex-col space-y-4' : 'flex justify-between items-start'}`}>
                <div>
                  <h3 className="text-xl font-semibold">{formatarValor(direito.valorNominal)}</h3>
                  <p className="text-gray-500 mt-1">Fundo: {direito.nomeFundo}</p>
                  <div className="flex gap-4 mt-3">
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      direito.status === 'A_VENCER' 
                        ? 'bg-yellow-500/10 text-yellow-600' 
                        : 'bg-green-500/10 text-green-600'
                    }`}>
                      {direito.status === 'A_VENCER' ? 'A Vencer' : 'Vencido'}
                    </span>
                  </div>
                </div>
                <div className={`flex items-center gap-2 ${isMobile ? 'self-end' : ''}`}>
                  <Button variant="ghost" size="icon" onClick={() => startEditing(direito)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteDireito(direito.idDireito)}>
                    <Trash size={16} />
                  </Button>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <FileText size={20} className="text-primary" />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Vencimento: {new Date(direito.dataVencimento).toLocaleDateString('pt-BR')}
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Direito Creditório</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Valor Nominal</Label>
                <Input 
                  type="number"
                  value={editForm.valorNominal}
                  onChange={(e) => handleEditFormChange('valorNominal', parseFloat(e.target.value))}
                  placeholder="Valor"
                />
              </div>

              <div className="space-y-2">
                <Label>Data de Vencimento</Label>
                <Input 
                  type="date" 
                  value={editForm.dataVencimento}
                  onChange={(e) => handleEditFormChange('dataVencimento', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select 
                  value={editForm.status} 
                  onValueChange={(value) => handleEditFormChange('status', value as "A_VENCER" | "VENCIDO")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A_VENCER">A Vencer</SelectItem>
                    <SelectItem value="VENCIDO">Vencido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Fundo</Label>
                <Input 
                  value={editForm.nomeFundo}
                  onChange={(e) => handleEditFormChange('nomeFundo', e.target.value)}
                  placeholder="Nome do fundo"
                  disabled
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">
                Cancelar
              </Button>
              <Button onClick={saveChanges} className="w-full sm:w-auto">
                Salvar alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default DireitosIndex;
