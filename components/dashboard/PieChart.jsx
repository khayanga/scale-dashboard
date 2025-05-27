"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const scaleData = [
  {
    scale_id: "SCL001",
    location_name: "Nairobi Central",
    status: "operational",
    last_weight_reading: 1234.5,
  },
  {
    scale_id: "SCL002",
    location_name: "Mombasa Port",
    status: "offline",
    last_weight_reading: 0.0,
  },
  {
    scale_id: "SCL003",
    location_name: "Nairobi West",
    status: "maintenance",
    last_weight_reading: 1024.0,
  },
  {
    scale_id: "SCL004",
    location_name: "Kisumu Lakeside",
    status: "error",
    last_weight_reading: 0.0,
  },
  {
    scale_id: "SCL005",
    location_name: "Eldoret Highway",
    status: "operational",
    last_weight_reading: 1850.2,
  },
  {
    scale_id: "SCL006",
    location_name: "Nakuru Town",
    status: "operational",
    last_weight_reading: 2567.8,
  },
  {
    scale_id: "SCL007",
    location_name: "Thika Weighbridge",
    status: "operational",
    last_weight_reading: 975.3,
  },
  {
    scale_id: "SCL008",
    location_name: "Malindi Coastal",
    status: "offline",
    last_weight_reading: 0.0,
  },
  {
    scale_id: "SCL009",
    location_name: "Naivasha Depot",
    status: "maintenance",
    last_weight_reading: 1345.7,
  }
];

// Transform scale data into chart data grouped by status
const getChartData = () => {
  const statusCounts = scaleData.reduce((acc, scale) => {
    acc[scale.status] = (acc[scale.status] || 0) + 1;
    return acc;
  }, {});

  return [
    { 
      status: "operational", 
      count: statusCounts.operational || 0, 
      fill: "var(--color-operational)" 
    },
    { 
      status: "offline", 
      count: statusCounts.offline || 0, 
      fill: "var(--color-offline)" 
    },
    { 
      status: "maintenance", 
      count: statusCounts.maintenance || 0, 
      fill: "var(--color-maintenance)" 
    },
    { 
      status: "error", 
      count: statusCounts.error || 0, 
      fill: "var(--color-error)" 
    }
  ].filter(item => item.count > 0);
};

const chartConfig = {
  operational: {
    label: "Operational",
    color: "hsl(var(--chart-1))",
  },
  offline: {
    label: "Offline",
    color: "hsl(var(--chart-2))",
  },
  maintenance: {
    label: "Maintenance",
    color: "hsl(var(--chart-3))",
  },
  error: {
    label: "Error",
    color: "hsl(var(--chart-4))",
  }
};

export function ScaleStatusChart() {
  const chartData = getChartData();
  const totalScales = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-base md:text-lg">Scale Status Distribution</CardTitle>
        <CardDescription className="text-xs md:text-sm">Current status of all scales</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
              
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalScales}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Scales
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Operational scales: {chartData.find(d => d.status === "operational")?.count || 0}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing status distribution across {totalScales} scales
        </div>
      </CardFooter>
    </Card>
  );
}