"use client";
import ComportSettingTable from "@/components/page/setting/comportSettingTable";
import ProductionLineSettingTable from "@/components/page/setting/productionLineTable";
import ShiftTable from "@/components/page/setting/shiftTable";
import { useAppDispatch } from "@/redux/hooks";
import {
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Title,
} from "@tremor/react";

const SettingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Card className="w-full mx-auto">
      <Title className="font-semibold text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Setting
      </Title>
      <TabGroup>
        <TabList className="mt-4">
          <Tab>Comport</Tab>
          <Tab>Shift</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ComportSettingTable></ComportSettingTable>
          </TabPanel>
          <TabPanel>
            <ProductionLineSettingTable></ProductionLineSettingTable>
            <ShiftTable></ShiftTable>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
};

export default SettingPage;
