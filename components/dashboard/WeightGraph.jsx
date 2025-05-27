"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
import { Badge } from "../ui/badge";

export const scaleData = [
  {
    scale_id: "SCL001",
    location_name: "Nairobi Central",
    last_weight_reading: 1234.5,
    last_updated: "2025-05-23T10:20:00",
  },
  {
    scale_id: "SCL002",
    location_name: "Mombasa Port",
    last_weight_reading: 0.0,
    last_updated: "2025-05-20T08:15:00",
  },
  {
    scale_id: "SCL003",
    location_name: "Nairobi West",
    last_weight_reading: 1024.0,
    last_updated: "2025-05-20T08:15:00",
  },
  {
    scale_id: "SCL004",
    location_name: "Kisumu Lakeside",
    last_weight_reading: 0.0,
    last_updated: "2025-05-21T12:45:00",
  },
  {
    scale_id: "SCL005",
    location_name: "Eldoret Highway",
    last_weight_reading: 1850.2,
    last_updated: "2025-05-22T16:40:00",
  },
  {
    scale_id: "SCL006",
    location_name: "Nakuru Town",
    last_weight_reading: 2567.8,
    last_updated: "2025-05-23T09:30:00",
  },
  {
    scale_id: "SCL007",
    location_name: "Thika Weighbridge",
    last_weight_reading: 975.3,
    last_updated: "2025-05-23T11:15:00",
  },
  {
    scale_id: "SCL008",
    location_name: "Malindi Coastal",
    last_weight_reading: 0.0,
    last_updated: "2025-05-18T14:20:00",
  },
  {
    scale_id: "SCL009",
    location_name: "Naivasha Depot",
    last_weight_reading: 1345.7,
    last_updated: "2025-05-22T10:30:00",
  },
];

// Transform the data for the chart
const chartData = scaleData.map((scale) => ({
  scale: scale.scale_id,
  location: scale.location_name,
  weight: scale.last_weight_reading,
  date: new Date(scale.last_updated).toLocaleDateString(),
}));

const chartConfig = {
  weight: {
    label: "Weight (kg)",
    color: "hsl(var(--chart-1))",
  },
};

export function WeightGraph() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base md:text-lg">
              Weight Distribution
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              24-hour weight measurement trends across all scales
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs"
          >
            Live Data
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            width={800}
            height={400}
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="scale"
              tickFormatter={(value) => value.replace("SCL", "")}
            />
            <YAxis
              label={{
                value: "Weight (kg)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              formatter={(value) => [`${value} kg`, "Weight"]}
              labelFormatter={(label) => `Scale ${label.replace("SCL", "")}`}
            />
            <defs>
              <linearGradient id="fillWeight" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-weight)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-weight)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="weight"
              stroke="var(--color-weight)"
              fill="url(#fillWeight)"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Latest reading:{" "}
              {Math.max(...chartData.map((item) => item.weight))} kg{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing {chartData.length} active scales
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
