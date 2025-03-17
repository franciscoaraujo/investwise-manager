
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Users, Wallet, Activity } from "lucide-react";
import Layout from "@/components/Layout";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardCard = ({ title, value, change, icon: Icon }: any) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="p-4 md:p-6 glass-panel animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-xl md:text-2xl font-semibold mt-2">{value}</h3>
          <p className="text-sm text-green-500 flex items-center mt-2">
            <ArrowUpRight size={16} className="mr-1" />
            {change}
          </p>
        </div>
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon size={isMobile ? 20 : 24} className="text-primary" />
        </div>
      </div>
    </Card>
  );
};

const Dashboard = () => {
  const isMobile = useIsMobile();
  
  return (
    <Layout>
      <div className="space-y-6 md:space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-2">Bem-vindo ao seu painel de controle FIDC</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <DashboardCard
            title="Total de Fundos"
            value="12"
            change="+2.5% este mês"
            icon={Wallet}
          />
          <DashboardCard
            title="Cotistas Ativos"
            value="234"
            change="+3.2% este mês"
            icon={Users}
          />
          <DashboardCard
            title="Operações Mensais"
            value="1,234"
            change="+5.1% este mês"
            icon={Activity}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
