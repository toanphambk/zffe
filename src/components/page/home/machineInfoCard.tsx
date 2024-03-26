"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useMonitorServiceManagerControllerGetMachineStateQuery } from "@/redux/services/api";
import { Badge, Card } from "@tremor/react";
import { machine } from "os";
import { useEffect } from "react";

const MachineInfoCard: React.FC = () => {
  const dispatch = useAppDispatch();

  const { machine: settingMachine } = useAppSelector(
    (state) => state.appSettingReducer
  );


  const {
    refetch: getMachineState,
    data: machineStatus,
  } = useMonitorServiceManagerControllerGetMachineStateQuery({
    machineId: settingMachine ? settingMachine.id : 0,
  },
    {
      skip: typeof settingMachine === "undefined",
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    const interval = setInterval(async () => {
      if (settingMachine) {
        let result = await getMachineState().unwrap()
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [machine]);

  if (!machineStatus) {
    return <Card className="flex flex-col w-full h-40">Loading...</Card>;
  }


  return (
    <Card className="flex flex-col w-full h-40">
      <div className="flex flex-row justify-between ">
        <div className="text-xl font-semibold text-black ">Line Info</div>
        <Badge size="md" className="font-semibold" color={machineStatus.connection ? "green" : "red"}>
          {machineStatus.connection ? "Connected" : "Disconnected"}
        </Badge>
      </div>
      <div className="flex flex-col items-start w-full">
        <div className="flex justify-between w-full mt-2">
          <div className="text-base font-semibold text-gray-500">State</div>
          <Badge size="md" className="font-semibold" color="green">
            {machineStatus.state}
          </Badge>
        </div>
        <div className="flex justify-between w-full mt-2">
          <div className="text-base font-semibold text-gray-500">IP</div>
          <Badge size="md" className="font-semibold">
            {machineStatus.config.machine.ip}
          </Badge>
        </div>
        <div className="flex justify-between w-full mt-2">
          <div className="text-base font-semibold text-gray-500">
            ID
          </div>
          <Badge size="md" className="font-semibold">
            {machineStatus.config.machine.systemID}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default MachineInfoCard;
