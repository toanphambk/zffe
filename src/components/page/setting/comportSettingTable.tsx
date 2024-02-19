"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Card, Title } from "@tremor/react";
import DataTable from "react-data-table-component";
import { HiCog, HiPlusCircle } from "react-icons/hi";
import { useMemo } from "react";
import GenericFormModal, {
  FieldConfig,
  GenericFormModalProps,
} from "@/components/genericFormModal";
import { setModal } from "@/redux/UI/modalSlice";
import {
  PortsSetting,
  setPortInfo,
  setPortOption,
} from "@/redux/data/portsSettingSlice";
import PromptModal from "@/components/promtModal";
import { error } from "console";

type PortSettingRow = {
  device: keyof PortsSetting;
  portInfo?: Partial<SerialPortInfo>;
  portOption?: SerialOptions;
};

const ComportSettingTable: React.FC = () => {
  const dispatch = useAppDispatch();

  const { rfid: rfidSetting, scanner: scannerSetting } = useAppSelector(
    (state) => state.portsSettingReducer
  );

  const tableData = useMemo(() => {
    const data: PortSettingRow[] = [];
    data.push({ device: "rfid", ...rfidSetting });
    data.push({ device: "scanner", ...scannerSetting });
    return data;
  }, [rfidSetting, scannerSetting]);

  const columns = [
    {
      name: "Device",
      selector: (row: PortSettingRow) => row.device || "",
    },
    {
      name: "Usb ProductID",
      selector: (row: PortSettingRow) => row.portInfo?.usbProductId || "",
    },
    {
      name: "Usb Vendor ID",
      selector: (row: PortSettingRow) => row.portInfo?.usbVendorId || "",
    },
    {
      name: "Baud Rate",
      selector: (row: PortSettingRow) =>
        row.portOption?.baudRate.toString() || "",
    },
    {
      name: "Parity",
      selector: (row: PortSettingRow) => row.portOption?.parity || "",
    },
    {
      name: "Data Bits",
      selector: (row: PortSettingRow) =>
        row.portOption?.dataBits?.toString() || "",
    },
    {
      name: "Stop Bits",
      selector: (row: PortSettingRow) =>
        row.portOption?.stopBits?.toString() || "",
    },
    {
      name: "Buffer Size",
      selector: (row: PortSettingRow) =>
        row.portOption?.bufferSize?.toString() || "",
    },
    {
      name: "Flow Control",
      selector: (row: PortSettingRow) => row.portOption?.flowControl || "",
    },
    {
      name: "Actions",
      right: true,
      cell: (row: PortSettingRow) => (
        <>
          <HiCog
            className="p-1 mx-2 text-2xl text-white bg-blue-600 rounded-full"
            onClick={() => settingSerialPort(row)}
          ></HiCog>
        </>
      ),
    },
  ];

  const conditionalRowStyles = [
    {
      when: () => true,
      classNames: [
        "bg-white text-black font-semibold text-black hover:bg-blue-200 hover:cursor-pointer font-semibold",
      ],
    },
  ];

  function getComportSettingModalConfig(
    device: keyof PortsSetting
  ): GenericFormModalProps<SerialOptions, keyof PortsSetting> {
    const icon = (
      <HiPlusCircle className="mt-1 mr-5 text-3xl text-green-500"></HiPlusCircle>
    );

    return {
      icon,
      title: `Setting ${device} Comport`,
      sucessMessage: "Setting Done",
      errorMessage: "Added False",
      submitBtnColor: "blue",
      data: device,
      formInitData: {
        baudRate: 9600,
        dataBits: 8,
        parity: "none",
        stopBits: 1,
        flowControl: "none",
      },
      onSubmit: async ({ formData, data: device }) => {
        try {
          dispatch(
            setPortOption({
              device,
              portOption: formData,
            })
          );
        } catch (err) {
          throw err;
        }
      },
      fields: serialOptionFields,
    };
  }

  const serialOptionFields: FieldConfig<SerialOptions>[] = [
    {
      type: "select",
      title: "Baud Rate",
      require: true,
      key: "baudRate",
      options: [
        { label: "9600", value: 9600 },
        { label: "19200", value: 19200 },
        { label: "38400", value: 38400 },
        { label: "57600", value: 57600 },
        { label: "115200", value: 115200 },
      ],
    },
    { type: "number", title: "Data Bits", require: false, key: "dataBits" },
    {
      type: "select",
      title: "Parity",
      require: false,
      key: "parity",
      options: [
        { label: "None", value: "none" },
        { label: "Even", value: "even" },
        { label: "Odd", value: "odd" },
        { label: "Mark", value: "mark" },
        { label: "Space", value: "space" },
      ],
    },
    { type: "number", title: "Stop Bits", require: false, key: "stopBits" },
    { type: "number", title: "Buffer Size", require: false, key: "bufferSize" },
    {
      type: "select",
      title: "Flow Control",
      require: false,
      key: "flowControl",
      options: [
        { label: "None", value: "none" },
        { label: "Hardware", value: "hardware" },
      ],
    },
  ];

  const settingSerialPort = async (portSettingRow: PortSettingRow) => {
    if ("serial" in navigator) {
      try {
        const ports = await navigator.serial.getPorts();
        ports.forEach((port) => console.log("port avaiable:", port.getInfo()));
        const qrCode = ports.filter((port) => port.getInfo());
        const { device } = portSettingRow;
        const selectedPort = await navigator.serial.requestPort({
          filters: [],
        });
        const otherDevice = device === "rfid" ? scannerSetting : rfidSetting;
        const portInfo = selectedPort.getInfo();

        if (otherDevice?.portInfo?.usbProductId === portInfo.usbProductId) {
          throw "RFID and scanner cannot share the same port. Please select a different port.";
        }

        dispatch(setPortInfo({ device, portInfo: selectedPort.getInfo() }));
        dispatch(
          setModal(
            <GenericFormModal {...getComportSettingModalConfig(device)} />
          )
        );
      } catch (err) {
        console.log(err);

        showErrorModal("Failed to Setting Port.", err);
      }
    } else {
      showErrorModal("Web Serial API not supported in this browser.");
    }
  };

  const showErrorModal = (message: string, err?: any) => {
    dispatch(
      setModal(
        <PromptModal
          {...{
            type: "error",
            title: "Error",
            data: JSON.stringify(err, null, 2),
            message: message,
          }}
        ></PromptModal>
      )
    );
  };

  return (
    <div className="flex flex-row w-full">
      <Card className="flex flex-col w-full mt-5 ">
        <div className="flex flex-row justify-between w-full">
          <div className="flex items-center">
            <Title>Setting</Title>
          </div>
        </div>
        <DataTable
          className="font-semibold"
          columns={columns}
          conditionalRowStyles={conditionalRowStyles}
          data={tableData}
        />
      </Card>
    </div>
  );
};

export default ComportSettingTable;
