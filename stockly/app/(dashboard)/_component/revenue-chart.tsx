"use client";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/app/_components/ui/chart";
import { DayTotalRevenue } from "@/app/_data-access/dashboard/get-dashboard";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig: ChartConfig = {
  totalRevenue: {
    label: "Receita",
  }
};

interface RevenueChartProps {
  data: DayTotalRevenue[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-0 w-full">
      <BarChart
        accessibilityLayer
        data={data}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          content={<ChartTooltipContent />}
        />
        <Bar
          dataKey="totalRevenue"
          fill="#8884d8"
          radius={4}
        />

      </BarChart>
    </ChartContainer>
  );
}

export default RevenueChart;

// no <XAxis dataKey="day" /> the dataKey should be a string, but it's a Date object.
// o dataKey tem que existir no objeto que está sendo passado para o BarChart, e o dataKey tem que ser uma string.