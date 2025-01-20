import { CircleDollarSign, DollarSign, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import SummaryCard, { SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./_component/summary-card";
import { getDashboard } from "../_data-access/dashboard/get-dashboard";
import { formatCurrency } from "../_helpers/currency";
import RevenueChart from "./_component/revenue-chart";

const Home = async () => {
  const {
    totalRevenue,
    todayRevenue,
    totalSales,
    totalStock,
    totalProducts,
    totalLast14DaysRevenue
  } = await getDashboard();

  return (
    <div className="m-8 w-full space-y-8 rounded-lg flex flex-col">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de dados</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>

      <div className="grid grid-cols-2 gap-6">
        <SummaryCard>
          <SummaryCardIcon>
            <DollarSign />
          </SummaryCardIcon>
          <SummaryCardTitle>
            Receita Total
          </SummaryCardTitle>
          <SummaryCardValue>
            {formatCurrency(totalRevenue)}
          </SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <DollarSign />
          </SummaryCardIcon>
          <SummaryCardTitle>
            Receita Hoje
          </SummaryCardTitle>
          <SummaryCardValue>
            {formatCurrency(todayRevenue)}
          </SummaryCardValue>
        </SummaryCard>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard>
          <SummaryCardIcon>
            <CircleDollarSign />
          </SummaryCardIcon>
          <SummaryCardTitle>
            Vendas Totais
          </SummaryCardTitle>
          <SummaryCardValue>
            {totalSales}
          </SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <PackageIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>
            Total em Estoque
          </SummaryCardTitle>
          <SummaryCardValue>
            {totalStock}
          </SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <ShoppingBasketIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>
            Produtos
          </SummaryCardTitle>
          <SummaryCardValue>
            {totalProducts}
          </SummaryCardValue>
        </SummaryCard>
      </div>

      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
        <p className="text-lg font-semibold text-slate-900">Receita</p>
        <p className="text-sm text-slate-500">Últimos 14 dias</p>
        <RevenueChart data={totalLast14DaysRevenue}/>
      </div>
    </div>
  );
};

export default Home;
