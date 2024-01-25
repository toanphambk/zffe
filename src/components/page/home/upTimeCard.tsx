"use client";
import { useAppDispatch } from "@/redux/hooks";
import { Card, Title, Tracker, Flex, Text, Color, Badge } from "@tremor/react";

interface Tracker {
  color: Color;
  tooltip: string;
}

const data: Tracker[] = [
  { color: "rose", tooltip: "Downtime" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "emerald", tooltip: "Operational" },
  { color: "rose", tooltip: "Downtime" },
  { color: "gray", tooltip: "no data" },
  { color: "gray", tooltip: "no data" },
  { color: "gray", tooltip: "no data" },
  { color: "gray", tooltip: "no data" },
  { color: "gray", tooltip: "no data" },
  { color: "gray", tooltip: "no data" },
  { color: "gray", tooltip: "no data" },
  { color: "gray", tooltip: "no data" },
  { color: "gray", tooltip: "no data" },
];

const UpTimeCard: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Card className="flex flex-col w-full h-40">
      <div className="flex flex-row justify-between mt-1">
        <text className="text-xl font-semibold text-black ">Up Time</text>
        <Badge size="md" color="green">
          92 %
        </Badge>
      </div>

      <div className="flex justify-between mt-1">
        <text className="font-medium text-gray-500 text-start">
          May 2022 - Ship 1
        </text>
      </div>
      <Tracker data={data} className="mt-4" />
    </Card>
  );
};

export default UpTimeCard;
