import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useMonitorServiceManagerControllerGetMachineStateQuery } from "@/redux/services/api";
import { Card, DonutChart, Legend, Title } from "@tremor/react";
import { machine } from "os";
import React, { useEffect, useState } from "react";

const data = [
  {
    name: "model 1",
    quantity: 10,
  },
  {
    name: "model 2",
    quantity: 20,
  },
  {
    name: "model 3",
    quantity: 40,
  },
];

const models = data.map((item) => item.name);

const ShiftDonutChart: React.FC = () => {
  return (
    <Card className="flex flex-col w-full mt-4">
      <Title>Model Chart</Title>
      <DonutChart
        className="mt-10"
        data={data}
        variant="pie"
        category="quantity"
        index="name"
        showLabel={false}
        colors={["blue", "violet", "indigo", "rose", "cyan", "amber"]}
      />
      <div className="flex flex-col items-center mt-10">
        <Legend
          className="mt-5 font-semibold"
          categories={models}
          colors={["blue", "violet", "indigo", "rose", "cyan", "amber"]}
        />
      </div>
    </Card>
  );
};

export default ShiftDonutChart;
