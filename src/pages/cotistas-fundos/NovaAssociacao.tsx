
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

const NovaAssociacao = () => {
  const navigate = useNavigate();
  const [associacao, setAssociacao] = useState({
    idFundo: "",
    idCotista: "",
    quantidadeCotas: "",
    dataAquisicao: undefined as Date | undefined
  });

  // Mock data (em produção, seria carregado da API)
  const fundos = [
    { id: "1", nome: "Fundo de Investimento Teste" },
    { id: "2", nome: "Fundo de Crédito Corporativo" }
  ];

  const cotistas = [
    { id: "1", nome: "João Silva" },
    { id: "2", nome: "Empresa ABC Ltda" }
  ];

  const handleSelectChange = (name: string, value: string) => {
    setAssociacao({
      ...associacao,
      [name]: value
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssociacao({
      ...associacao,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    setAssociacao({
      ...associacao,
      dataAquisicao: date
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de envio para a API
    console.log("Dados da associação a serem enviados:", associacao);
    
    toast.success("Cotista associado ao fundo com sucesso!");
    navigate("/fundos");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Nova Associação</h1>
            <p className="text-gray-500 mt-1">Associe um cotista a um fundo</p>
          </div>
          <div className="flex gap-2">
            <Link to="/fundos">
              <Button variant="outline">Cancelar</Button>
            </Link>
            <Button form="associacao-form" type="submit" className="flex items-center gap-2">
              <Save size={16} />
              Salvar
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Associação</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="associacao-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="space-y-2">
                  <Label htmlFor="idCotista">Cotista</Label>
                  <Select onValueChange={(value) => handleSelectChange("idCotista", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cotista" />
                    </SelectTrigger>
                    <SelectContent>
                      {cotistas.map((cotista) => (
                        <SelectItem key={cotista.id} value={cotista.id}>
                          {cotista.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantidadeCotas">Quantidade de Cotas</Label>
                  <Input
                    id="quantidadeCotas"
                    name="quantidadeCotas"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={associacao.quantidadeCotas}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataAquisicao">Data de Aquisição</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !associacao.dataAquisicao && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {associacao.dataAquisicao ? (
                          format(associacao.dataAquisicao, "dd/MM/yyyy")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={associacao.dataAquisicao}
                        onSelect={handleDateChange}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NovaAssociacao;
