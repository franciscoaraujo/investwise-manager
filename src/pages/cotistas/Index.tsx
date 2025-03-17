
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Plus, Trash } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";

type Cotista = {
  idCotista: number;
  nome: string;
  cpfCnpj: string;
  tipoPessoa: "PF" | "PJ";
}

const CotistasIndex = () => {
  const isMobile = useIsMobile();
  const [cotistas, setCotistas] = useState<Cotista[]>([
    {
      idCotista: 1,
      nome: "João Silva",
      cpfCnpj: "12345678901",
      tipoPessoa: "PF"
    },
    {
      idCotista: 2,
      nome: "Empresa ABC Ltda",
      cpfCnpj: "12345678000195",
      tipoPessoa: "PJ"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<Cotista>({
    idCotista: 0,
    nome: "",
    cpfCnpj: "",
    tipoPessoa: "PF"
  });

  const startEditing = (cotista: Cotista) => {
    setEditForm({...cotista});
    setIsDialogOpen(true);
  };

  const handleEditFormChange = (
    field: keyof Cotista, 
    value: string
  ) => {
    setEditForm({...editForm, [field]: value});
  };

  const saveChanges = () => {
    setCotistas(cotistas.map(c => 
      c.idCotista === editForm.idCotista 
        ? editForm
        : c
    ));
    
    setIsDialogOpen(false);
    toast.success("Cotista atualizado com sucesso!");
  };

  const deleteCotista = (id: number) => {
    setCotistas(cotistas.filter(c => c.idCotista !== id));
    toast.success("Cotista removido com sucesso!");
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className={`${isMobile ? 'flex flex-col space-y-4' : 'flex justify-between items-center'}`}>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Cotistas</h1>
            <p className="text-gray-500 mt-2">Gerenciamento de cotistas FIDC</p>
          </div>
          <Link to="/cotistas/novo">
            <Button className="flex items-center gap-2 w-full md:w-auto justify-center">
              <Plus size={16} />
              {isMobile ? "Novo" : "Novo Cotista"}
            </Button>
          </Link>
        </div>

        {!isMobile ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF/CNPJ</TableHead>
                  <TableHead>Tipo de Pessoa</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cotistas.map((cotista) => (
                  <TableRow key={cotista.idCotista}>
                    <TableCell>{cotista.nome}</TableCell>
                    <TableCell>{cotista.cpfCnpj}</TableCell>
                    <TableCell>
                      {cotista.tipoPessoa === "PF" ? "Pessoa Física" : "Pessoa Jurídica"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => startEditing(cotista)}>
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteCotista(cotista.idCotista)}>
                          <Trash size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="space-y-4">
            {cotistas.map((cotista) => (
              <Card key={cotista.idCotista} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{cotista.nome}</h3>
                    <p className="text-gray-500 mt-1">CPF/CNPJ: {cotista.cpfCnpj}</p>
                    <div className="mt-2">
                      <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {cotista.tipoPessoa === "PF" ? "Pessoa Física" : "Pessoa Jurídica"}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => startEditing(cotista)}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteCotista(cotista.idCotista)}>
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Cotista</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Tipo de Pessoa</Label>
                <Select 
                  value={editForm.tipoPessoa} 
                  onValueChange={(value) => handleEditFormChange('tipoPessoa', value as "PF" | "PJ")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PF">Pessoa Física</SelectItem>
                    <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Nome</Label>
                <Input 
                  value={editForm.nome}
                  onChange={(e) => handleEditFormChange('nome', e.target.value)}
                  placeholder={editForm.tipoPessoa === "PF" ? "Nome completo" : "Razão social"}
                />
              </div>

              <div className="space-y-2">
                <Label>{editForm.tipoPessoa === "PF" ? "CPF" : "CNPJ"}</Label>
                <Input 
                  value={editForm.cpfCnpj}
                  onChange={(e) => handleEditFormChange('cpfCnpj', e.target.value)}
                  placeholder={editForm.tipoPessoa === "PF" ? "000.000.000-00" : "00.000.000/0000-00"}
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

export default CotistasIndex;
