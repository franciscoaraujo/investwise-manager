import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Fundo } from "@/domain/fundos/types";

interface EditFundoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fundo: Fundo) => void;
  initialData: Fundo;
}

const EditFundoDialog = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EditFundoDialogProps) => {
  const [editForm, setEditForm] = useState<Fundo>(initialData);

  useEffect(() => {
    setEditForm(initialData);
  }, [initialData]);

  const handleEditFormChange = (field: keyof Fundo, value: string) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const handleSave = () => {
    onSave(editForm);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Fundo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input
              value={editForm.nome}
              onChange={(e) => handleEditFormChange("nome", e.target.value)}
              placeholder="Nome do fundo"
            />
          </div>

          <div className="space-y-2">
            <Label>CNPJ</Label>
            <Input
              value={editForm.cnpj}
              onChange={(e) => handleEditFormChange("cnpj", e.target.value)}
              placeholder="00.000.000/0000-00"
            />
          </div>

          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select
              value={editForm.tipo}
              onValueChange={(value) =>
                handleEditFormChange("tipo", value as "ABERTO" | "FECHADO")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ABERTO">Aberto</SelectItem>
                <SelectItem value="FECHADO">Fechado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Data de Constituição</Label>
            <Input
              type="date"
              value={editForm.dataConstituicao}
              onChange={(e) =>
                handleEditFormChange("dataConstituicao", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={editForm.status}
              onValueChange={(value) =>
                handleEditFormChange("status", value as "ATIVO" | "INATIVO")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ATIVO">Ativo</SelectItem>
                <SelectItem value="INATIVO">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
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

export default EditFundoDialog;
