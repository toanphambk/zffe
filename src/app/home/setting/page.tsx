"use client";
import ComportSettingTable from "@/components/page/setting/comportSettingTable";
import MachineSettingTable from "@/components/page/setting/machineTable";
import ShiftTable from "@/components/page/setting/shiftTable";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Machine } from "@/redux/services/api";
import {
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Title,
} from "@tremor/react";
import DataTable from "react-data-table-component";

const SettingPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { machine: settingMachine } = useAppSelector(
    (state) => state.appSettingReducer
  );


  const settingColumns = [
    {
      name: "System ID",
      selector: (row: Machine) => row.systemID,
    },
    {
      name: "Line ID",
      selector: (row: Machine) => row.lineID,
    },
    {
      name: "Station Name",
      selector: (row: Machine) => row.stationName,
    },
    {
      name: "Station ID",
      selector: (row: Machine) => row.stationID,
    },
    {
      name: "Description",
      selector: (row: Machine) => row.description,
    },
    {
      name: "IP Address",
      selector: (row: Machine) => row.ip,
    },
  ]

  return (
    <>
      <Card className="flex flex-col w-full mt-4">
        <Title className="font-semibold text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong">
          machine Setting
        </Title>
        <DataTable
          columns={settingColumns}
          data={settingMachine ? [settingMachine] : []}
        />
      </Card>

      <Card className="w-full mx-auto mt-4">
        <TabGroup>
          <TabList >
            <Tab>Comport</Tab>
            <Tab>machine</Tab>
            <Tab>Shift</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ComportSettingTable></ComportSettingTable>
            </TabPanel>
            <TabPanel>
              <MachineSettingTable></MachineSettingTable>
            </TabPanel>
            <TabPanel>
              <ShiftTable></ShiftTable>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </>
  );
};

export default SettingPage;
