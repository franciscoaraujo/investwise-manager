
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Save } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NovoCotista = () => {
  const navigate = useNavigate();
  const [cotista, setCotista] = useState({
    nome: "",
    cpfCnpj: "",
    tipoPessoa: "PF" as "PF" | "PJ"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCotista({
      ...cotista,
      [e.target.name]: e.target.value
    });
  };

  const handleTipoPessoaChange = (value: "PF" | "PJ") => {
    setCotista({
      ...cotista,
      tipoPessoa: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de envio para a API
    console.log("Dados do cotista a serem enviados:", cotista);
    
    toast.success("Cotista criado com sucesso!");
    navigate("/cotistas");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Novo Cotista</h1>
            <p className="text-gray-500 mt-1">Cadastre um novo cotista</p>
          </div>
          <div className="flex gap-2">
            <Link to="/cotistas">
              <Button variant="outline">Cancelar</Button>
            </Link>
            <Button form="cotista-form" type="submit" className="flex items-center gap-2">
              <Save size={16} />
              Salvar
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Cotista</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="cotista-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tipo de Pessoa</Label>
                  <RadioGroup
                    value={cotista.tipoPessoa}
                    onValueChange={(value) => handleTipoPessoaChange(value as "PF" | "PJ")}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PF" id="pf" />
                      <Label htmlFor="pf">Pessoa Física</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PJ" id="pj" />
                      <Label htmlFor="pj">Pessoa Jurídica</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    name="nome"
                    placeholder={cotista.tipoPessoa === "PF" ? "Nome completo" : "Razão social"}
                    value={cotista.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpfCnpj">{cotista.tipoPessoa === "PF" ? "CPF" : "CNPJ"}</Label>
                  <Input
                    id="cpfCnpj"
                    name="cpfCnpj"
                    placeholder={cotista.tipoPessoa === "PF" ? "000.000.000-00" : "00.000.000/0000-00"}
                    value={cotista.cpfCnpj}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NovoCotista;
