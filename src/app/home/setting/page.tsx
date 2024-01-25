"use client";
import ProductionLineSettingTable from "@/components/page/setting/productionLineTable";
import ShiftTable from "@/components/page/setting/shiftTable";
import { useAppDispatch } from "@/redux/hooks";

const SettingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <ProductionLineSettingTable></ProductionLineSettingTable>
      <ShiftTable></ShiftTable>
    </>
  );
};

export default SettingPage;
