
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const NovaOperacao = () => {
  const navigate = useNavigate();
  const [operacao, setOperacao] = useState({
    tipo: "",
    idFundo: "",
    idCotista: "",
    idDireito: "",
    valor: "",
    dataOperacao: new Date()
  });

  const [mostrarCotista, setMostrarCotista] = useState(false);

  // Mock data (em produção, seria carregado da API)
  const fundos = [
    { id: "1", nome: "Fundo de Investimento Teste" },
    { id: "2", nome: "Fundo de Crédito Corporativo" }
  ];

  const cotistas = [
    { id: "1", nome: "João Silva" },
    { id: "2", nome: "Empresa ABC Ltda" }
  ];

  const direitos = [
    { id: "1", descricao: "Direito Creditório #1 - R$ 10.000,00" },
    { id: "2", descricao: "Direito Creditório #2 - R$ 15.000,00" }
  ];

  useEffect(() => {
    // Definir se deve mostrar o campo de cotista com base no tipo de operação
    if (operacao.tipo === "AQUISICAO_COTAS" || operacao.tipo === "VENDA_COTAS") {
      setMostrarCotista(true);
    } else {
      setMostrarCotista(false);
      setOperacao(prev => ({ ...prev, idCotista: "" }));
    }
  }, [operacao.tipo]);

  const handleSelectChange = (name: string, value: string) => {
    setOperacao({
      ...operacao,
      [name]: value
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOperacao({
      ...operacao,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setOperacao({
        ...operacao,
        dataOperacao: date
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de envio para a API
    console.log("Dados da operação a serem enviados:", operacao);
    
    toast.success("Operação cadastrada com sucesso!");
    navigate("/operacoes");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Nova Operação</h1>
            <p className="text-gray-500 mt-1">Cadastre uma nova operação</p>
          </div>
          <div className="flex gap-2">
            <Link to="/operacoes">
              <Button variant="outline">Cancelar</Button>
            </Link>
            <Button form="operacao-form" type="submit" className="flex items-center gap-2">
              <Save size={16} />
              Salvar
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Operação</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="operacao-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Operação</Label>
                  <Select onValueChange={(value) => handleSelectChange("tipo", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de operação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CESSAO">Cessão</SelectItem>
                      <SelectItem value="AQUISICAO">Aquisição</SelectItem>
                      <SelectItem value="AQUISICAO_COTAS">Aquisição de Cotas</SelectItem>
                      <SelectItem value="VENDA_COTAS">Venda de Cotas</SelectItem>
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

                {mostrarCotista && (
                  <div className="space-y-2">
                    <Label htmlFor="idCotista">Cotista</Label>
                    <Select onValueChange={(value) => handleSelectChange("idCotista", value)} required={mostrarCotista}>
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
                )}

                <div className="space-y-2">
                  <Label htmlFor="idDireito">Direito Creditório</Label>
                  <Select onValueChange={(value) => handleSelectChange("idDireito", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o direito creditório" />
                    </SelectTrigger>
                    <SelectContent>
                      {direitos.map((direito) => (
                        <SelectItem key={direito.id} value={direito.id}>
                          {direito.descricao}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valor">Valor</Label>
                  <Input
                    id="valor"
                    name="valor"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={operacao.valor}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataOperacao">Data da Operação</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(operacao.dataOperacao, "dd/MM/yyyy")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={operacao.dataOperacao}
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

export default NovaOperacao;
