import { Card, LineChart, Title } from "@tremor/react";
import React from "react";

const chartdata = [
  {
    Hour: 0,
    Actual: 0,
    Target: Math.ceil((150 * 0) / 8),
  },
  {
    Hour: 1,
    Actual: 15,
    Target: Math.ceil((150 * 1) / 8),
  },
  {
    Hour: 2,
    Actual: 24,
    Target: Math.ceil((150 * 2) / 8),
  },
  {
    Hour: 3,
    Actual: 32,
    Target: Math.ceil((150 * 3) / 8),
  },
  {
    Hour: 4,
    Actual: 50,
    Target: Math.ceil((150 * 4) / 8),
  },
  {
    Hour: 5,
    Actual: 70,
    Target: Math.ceil((150 * 5) / 8),
  },
  {
    Hour: 6,
    Target: Math.ceil((150 * 6) / 8),
    Actual: null,
  },
  {
    Hour: 7,
    Target: Math.ceil((150 * 7) / 8),
    Actual: null,
  },
  {
    Hour: 8,
    Target: Math.ceil((150 * 8) / 8),
    Actual: null,
  },
];

const ShifpLineChart: React.FC = () => {
  return (
    <Card className="flex flex-col w-full mt-4">
      <Title>Actual/Target</Title>
      <LineChart
        className="h-64 mt-6 "
        data={chartdata}
        index="Hour"
        categories={["Actual", "Target"]}
        colors={["emerald", "gray"]}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default ShifpLineChart;
