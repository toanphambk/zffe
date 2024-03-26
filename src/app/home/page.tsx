"use client";
import React from "react";
import UpTimeCard from "@/components/page/home/upTimeCard";
import ShiftTargetCard from "@/components/page/home/shiftTargetCard";
import MachineInfoCard from "@/components/page/home/machineInfoCard";
import ShiftLineChart from "@/components/page/home/shiftLineChart";
import ShiftRecordTable from "@/components/page/home/shiftRecordTable";
import ShiftDonutChart from "@/components/page/home/shiftDonutChart";


const HomePage: React.FC = () => { 
  return (
    <>
      <div className="flex flex-row w-full">
        <div className="flex-1">
          <MachineInfoCard></MachineInfoCard>
        </div>
        <div className="flex-1 px-4">
          <ShiftTargetCard></ShiftTargetCard>
        </div>
        <div className="flex-1">
          <UpTimeCard></UpTimeCard>
        </div>
      </div>
      <div className="flex flex-row w-full">
        <div className="flex w-full">
          <ShiftLineChart></ShiftLineChart>
        </div>
      </div>
      <div className="flex flex-row w-full">
        <ShiftRecordTable></ShiftRecordTable>
      </div>
    </>
  );
};

export default HomePage;
