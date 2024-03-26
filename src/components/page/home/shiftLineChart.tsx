import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useMesControllerGetDailyLineChartDataQuery } from "@/redux/services/api";
import { Card, LineChart, Title } from "@tremor/react";
import React, { useEffect, useState } from "react";

const getCurrrentDateTime = () => {
  const currentDay = new Date()
  return currentDay.toISOString();
}


const ShiftLineChart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { machine: settingMachine } = useAppSelector((state) => state.appSettingReducer)
  const [currentTime, setCurrentTime] = useState(() => getCurrrentDateTime())

  const { refetch: getAllQuery, data } = useMesControllerGetDailyLineChartDataQuery({
    machineId: settingMachine ? settingMachine.id : 0,
    time: currentTime,
  },
    {
      skip: typeof settingMachine === "undefined",
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    const interval = setInterval( () => {
      setCurrentTime(getCurrrentDateTime());
      getAllQuery().unwrap();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="flex flex-col w-full mt-4">
      <Title>Product Count</Title>
      <LineChart
        className="h-64 mt-6 "
        data={data ? data : []}
        index="Hour"
        categories={["Actual"]}
        colors={["emerald", "gray"]}
        yAxisWidth={40}
      />
    </Card>
  );
};

export default ShiftLineChart;
