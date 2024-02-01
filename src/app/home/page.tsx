"use client";
import React from "react";
import UpTimeCard from "@/components/page/home/upTimeCard";
import ShifpTargetCard from "@/components/page/home/shipTargetCard";
import LineInfoCard from "@/components/page/home/lineInfoCard";
import ShifpLineChart from "../../components/page/home/shipLineChart";
import ShiftDonutChart from "@/components/page/home/shipDonutChart";
import ShifpRecordTable from "@/components/page/home/ShifpRecordTable";

const HomePage: React.FC = () => { 
  return (
    <>
      <div className="flex flex-row w-full">
        <div className="flex-1">
          <LineInfoCard></LineInfoCard>
        </div>
        <div className="flex-1 px-4">
          <ShifpTargetCard></ShifpTargetCard>
        </div>
        <div className="flex-1">
          <UpTimeCard></UpTimeCard>
        </div>
      </div>
      <div className="flex flex-row w-full">
        <div className="flex w-1/3 pr-2">
          <ShiftDonutChart></ShiftDonutChart>
        </div>
        <div className="flex w-2/3 pl-2">
          <ShifpLineChart></ShifpLineChart>
        </div>
      </div>
      <div className="flex flex-row w-full">
        <ShifpRecordTable></ShifpRecordTable>
      </div>
    </>
  );
};

export default HomePage;
