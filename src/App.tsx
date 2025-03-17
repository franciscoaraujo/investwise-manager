import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Páginas de Fundos
import FundosIndex from "./pages/fundos/Index";
import NovoFundo from "./pages/fundos/NovoFundo";

// Páginas de Cotistas
import CotistasIndex from "./pages/cotistas/Index";
import NovoCotista from "./pages/cotistas/NovoCotista";

// Página de Associação de Cotistas a Fundos
import NovaAssociacao from "./pages/cotistas-fundos/NovaAssociacao";

// Páginas de Direitos Creditórios
import DireitosIndex from "./pages/direitos/Index";
import NovoDireito from "./pages/direitos/NovoDireito";

// Páginas de Operações
import OperacoesIndex from "./pages/operacoes/Index";
import NovaOperacao from "./pages/operacoes/NovaOperacao";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Rotas de Fundos */}
            <Route path="/fundos" element={<FundosIndex />} />
            <Route path="/fundos/novo" element={<NovoFundo />} />
            
            {/* Rotas de Cotistas */}
            <Route path="/cotistas" element={<CotistasIndex />} />
            <Route path="/cotistas/novo" element={<NovoCotista />} />

            {/* Rota de Associação */}
            <Route path="/cotistas-fundos/novo" element={<NovaAssociacao />} />

            {/* Rotas de Direitos Creditórios */}
            <Route path="/direitos" element={<DireitosIndex />} />
            <Route path="/direitos/novo" element={<NovoDireito />} />

            {/* Rotas de Operações */}
            <Route path="/operacoes" element={<OperacoesIndex />} />
            <Route path="/operacoes/nova" element={<NovaOperacao />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
