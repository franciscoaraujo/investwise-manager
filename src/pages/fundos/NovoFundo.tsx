import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarIcon, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useFundos } from "@/application/hooks/useFundos";
import { Fundo } from "@/domain/fundos/types";
import { ApiError } from "@/infrastructure/api/config";

const NovoFundo = () => {
  const navigate = useNavigate();
  const { createFundo } = useFundos();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fundo, setFundo] = useState<Fundo>({
    nome: "",
    cnpj: "",
    tipo: "ABERTO" as "ABERTO" | "FECHADO",
    dataConstituicao: "",
    status: "ATIVO" as "ATIVO" | "INATIVO",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFundo({
      ...fundo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: keyof Fundo, value: string) => {
    setFundo({
      ...fundo,
      [name]: value as Fundo[typeof name],
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      // Format date as YYYY-MM-DD for API
      const formattedDate = format(date, "yyyy-MM-dd");
      setFundo({
        ...fundo,
        dataConstituicao: formattedDate,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createFundo(fundo);
      navigate("/fundos");
    } catch (err) {
      if (err instanceof ApiError) {
        setError((err.data?.erro as string) || err.message);
      } else {
        setError("Erro ao criar fundo. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Novo Fundo</h1>
            <p className="text-muted-foreground mt-1">
              Cadastre um novo fundo FIDC
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/fundos">
              <Button variant="outline">Cancelar</Button>
            </Link>
            <Button
              form="fundo-form"
              type="submit"
              className="flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Informações do Fundo</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="fundo-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Fundo</Label>
                  <Input
                    id="nome"
                    name="nome"
                    placeholder="Digite o nome do fundo"
                    value={fundo.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    name="cnpj"
                    placeholder="00.000.000/0000-00"
                    value={fundo.cnpj}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select
                    value={fundo.tipo}
                    onValueChange={(value) => handleSelectChange("tipo", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de fundo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ABERTO">Aberto</SelectItem>
                      <SelectItem value="FECHADO">Fechado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataConstituicao">Data de Constituição</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !fundo.dataConstituicao && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fundo.dataConstituicao ? (
                          format(new Date(fundo.dataConstituicao), "dd/MM/yyyy")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          fundo.dataConstituicao
                            ? new Date(fundo.dataConstituicao)
                            : undefined
                        }
                        onSelect={handleDateChange}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={fundo.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                    required
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
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NovoFundo;
