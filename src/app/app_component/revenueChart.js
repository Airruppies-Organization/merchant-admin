"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useContext } from "react";
import AdminContext from "../context/adminContext";

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

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

export function RevenueChart() {
  const frames = ["1D", "5D", "1M", "1Y"];
  const { chartData, setChartData, setChartFrame } = useContext(AdminContext);

  const handleFrame = (frame) => {
    setChartFrame(frame);
  };
  return (
    <Card className="relative mb-10 w-[28rem] bg-[#fdfdfd] p-3 rounded-lg mr-5">
      <CardHeader>
        <div>
          <div className="flex">
            <div className="h-8 w-8 rounded-full bg-[#61088E] mr-2"></div>
            <CardTitle>Sales Analytics</CardTitle>
          </div>
          {/* <p className="text-sm">Income</p>
          <div className="flex">
            <p>N</p>
            <p className="text-3xl">32,500</p>
          </div> */}
        </div>
      </CardHeader>

      <div className="flex w-[55%] justify-between h-8 ml-6 px-2">
        {frames.map((child, index) => {
          return (
            <div
              className="flex items-center justify-center h-full cursor-pointer hover:bg-[#e1e1e1] w-full"
              onClick={() => handleFrame(child)}
              key={index}
            >
              <p>{child}</p>
            </div>
          );
        })}
      </div>

      <CardContent>
        <ChartContainer className="h-[100%] mt-10" config={chartConfig}>
          <BarChart accessibilityLayer barCategoryGap={"40%"} data={chartData}>
            <CartesianGrid
              vertical={false}
              stroke="#000000"
              strokeWidth={0.1}
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                if (chartData.length < 8) {
                  return value;
                } else {
                  return value.slice(0, 3);
                }
              }}
            />
            <YAxis
              dataKey="sales"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sales" fill="#61088E" barSize={20} radius={10} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
