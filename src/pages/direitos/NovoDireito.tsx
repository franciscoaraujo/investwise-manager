
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Save } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const NovoDireito = () => {
  const navigate = useNavigate();
  const [direito, setDireito] = useState({
    valorNominal: "",
    dataVencimento: undefined as Date | undefined,
    status: "A_VENCER",
    idFundo: ""
  });

  // Mock data (em produção, seria carregado da API)
  const fundos = [
    { id: "1", nome: "Fundo de Investimento Teste" },
    { id: "2", nome: "Fundo de Crédito Corporativo" }
  ];

  const handleSelectChange = (name: string, value: string) => {
    setDireito({
      ...direito,
      [name]: value
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDireito({
      ...direito,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    setDireito({
      ...direito,
      dataVencimento: date
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de envio para a API
    console.log("Dados do direito creditório a serem enviados:", direito);
    
    toast.success("Direito creditório cadastrado com sucesso!");
    navigate("/direitos");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Novo Direito Creditório</h1>
            <p className="text-gray-500 mt-1">Cadastre um novo direito creditório</p>
          </div>
          <div className="flex gap-2">
            <Link to="/direitos">
              <Button variant="outline">Cancelar</Button>
            </Link>
            <Button form="direito-form" type="submit" className="flex items-center gap-2">
              <Save size={16} />
              Salvar
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Direito Creditório</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="direito-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="valorNominal">Valor Nominal</Label>
                  <Input
                    id="valorNominal"
                    name="valorNominal"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={direito.valorNominal}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataVencimento">Data de Vencimento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !direito.dataVencimento && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {direito.dataVencimento ? (
                          format(direito.dataVencimento, "dd/MM/yyyy")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={direito.dataVencimento}
                        onSelect={handleDateChange}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="A_VENCER" onValueChange={(value) => handleSelectChange("status", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A_VENCER">A Vencer</SelectItem>
                      <SelectItem value="VENCIDO">Vencido</SelectItem>
                      <SelectItem value="LIQUIDADO">Liquidado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idFundo">Fundo</Label>
                  <Select onValueChange={(value) => handleSelectChange("idFundo", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o fundo" />
                    </SelectTrigger>
                    <SelectContent>
                      {fundos.map((fundo) => (
                        <SelectItem key={fundo.id} value={fundo.id}>
                          {fundo.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NovoDireito;
