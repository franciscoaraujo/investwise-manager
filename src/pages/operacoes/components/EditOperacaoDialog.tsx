
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Operacao } from "../types";
import { useState, useEffect } from "react";

interface EditOperacaoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (operacao: Operacao) => void;
  initialData: Operacao;
}

const EditOperacaoDialog = ({ isOpen, onClose, onSave, initialData }: EditOperacaoDialogProps) => {
  const [editForm, setEditForm] = useState<Operacao>(initialData);

  useEffect(() => {
    setEditForm(initialData);
  }, [initialData]);

  const handleEditFormChange = (field: keyof Operacao, value: string | number | null) => {
    setEditForm({...editForm, [field]: value});
  };

  const handleSave = () => {
    onSave(editForm);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Operação</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select 
              value={editForm.tipo} 
              onValueChange={(value) => handleEditFormChange('tipo', value as "CESSAO" | "AQUISICAO" | "VENDA")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CESSAO">Cessão</SelectItem>
                <SelectItem value="AQUISICAO">Aquisição</SelectItem>
                <SelectItem value="VENDA">Venda</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Valor</Label>
            <Input 
              type="number"
              value={editForm.valor}
              onChange={(e) => handleEditFormChange('valor', parseFloat(e.target.value))}
              placeholder="Valor"
            />
          </div>

          <div className="space-y-2">
            <Label>Data da Operação</Label>
            <Input 
              type="datetime-local" 
              value={editForm.dataOperacao.substring(0, 16)}
              onChange={(e) => handleEditFormChange('dataOperacao', e.target.value)}
            />
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

          {editForm.nomeCotista && (
            <div className="space-y-2">
              <Label>Cotista</Label>
              <Input 
                value={editForm.nomeCotista}
                onChange={(e) => handleEditFormChange('nomeCotista', e.target.value)}
                placeholder="Nome do cotista"
                disabled
              />
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="w-full sm:w-auto">
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditOperacaoDialog;
