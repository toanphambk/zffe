"use client";
import { useAppDispatch } from "@/redux/hooks";
import { Badge, Card, CategoryBar, Legend } from "@tremor/react";

const ShifpTargetCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const shifpTarget = 150;
  const goodAmount = 50;
  const noGoodAmount = 20;
  const rate = Math.floor((goodAmount / shifpTarget) * 100);

  return (
    <Card className="flex flex-col w-full h-40">
      <div className="flex flex-row justify-between font-medium text-gray-500 ">
        <text className="text-xl font-semibold text-black ">Shifp Target</text>
        <Badge size="md" color="green">
          {rate} %
        </Badge>
      </div>
      <CategoryBar
        values={[
          goodAmount,
          noGoodAmount,
          shifpTarget - goodAmount - noGoodAmount,
        ]}
        showLabels={true}
        colors={["green", "red", "gray"]}
        className="w-full mt-4"
      />
      <Legend
        className="mt-2 "
        categories={["Good", "NoGood", "Remain"]}
        colors={["emerald", "red", "gray"]}
      />
    </Card>
  );
};

export default ShifpTargetCard;
