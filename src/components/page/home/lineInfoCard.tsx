"use client";
import { useAppDispatch } from "@/redux/hooks";
import { Badge, Card } from "@tremor/react";

const LineInfoCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const lineID = "BMC";
  const status = "Operational";
  const model = "vf7";
  const operator = "Nguyen van A";

  return (
    <Card className="flex flex-col w-full h-40">
      <div className="flex flex-row justify-between ">
        <div className="text-xl font-semibold text-black ">Line Info</div>
        <Badge size="md" className="font-semibold" color="green">
          {status}
        </Badge>
      </div>
      <div className="flex flex-col items-start w-full">
        <div className="flex justify-between w-full mt-2">
          <div className="text-base font-semibold text-gray-500">LineID</div>
          <Badge size="md" className="font-semibold" color="green">
            {lineID}
          </Badge>
        </div>
        <div className="flex justify-between w-full mt-2">
          <div className="text-base font-semibold text-gray-500">Model</div>
          <Badge size="md" className="font-semibold">
            {model}
          </Badge>
        </div>
        <div className="flex justify-between w-full mt-2">
          <div className="text-base font-semibold text-gray-500">
            Operator
          </div>
          <Badge size="md" className="font-semibold">
            {operator}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default LineInfoCard;
