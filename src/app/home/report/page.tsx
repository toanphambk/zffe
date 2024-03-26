"use client";
import GenericFormModal, { FieldConfig, GenericFormModalProps } from "@/components/genericFormModal";
import PromptModal, { PromptModalProps } from "@/components/promtModal";
import { setModal } from "@/redux/UI/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Machine, MesControllerFindAllRecordByMachineAndDateTimeApiArg, Record, Shift, useMachineControllerFindAllQuery, useMesControllerFindAllRecordByMachineAndDateTimeQuery } from "@/redux/services/api";
import {
  Button,
  Card,
  Title,
} from "@tremor/react";
import JSZip from "jszip";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { HiPlusCircle } from "react-icons/hi";

const Record: React.FC = () => {
  const dispatch = useAppDispatch();

  const [startTime, setStartTime] = useState<string | undefined>("")
  const [endTime, setEndTime] = useState<string | undefined>("")
  const [selectecdMachineId, setSelectedMachine] = useState<number | undefined>(undefined)

  const {
    refetch: getAllMachineQuerry,
  } = useMachineControllerFindAllQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const {
    refetch: getAllRecords,
    data: recordDatas,
  } = useMesControllerFindAllRecordByMachineAndDateTimeQuery({
    machineId: selectecdMachineId ? selectecdMachineId : 0,
    startTime,
    endTime,
  },
    {
      skip: typeof selectecdMachineId === "undefined",
      refetchOnMountOrArgChange: true,
    }
  );


  const getAllRecordQuerryConfig = async (): Promise<GenericFormModalProps<any, any>> => {
    try {
      const machines = await getAllMachineQuerry().unwrap();
      const machineOptions = machines?.map((machine) => ({
        label: machine.systemID,
        value: machine.id,
      })) || [];

      const fields: FieldConfig<any>[] = [
        {
          type: "select",
          title: "Machine",
          require: true,
          key: "machineId",
          options: machineOptions,
        },
        {
          type: "dateRangePicker",
          title: "Time Range",
          require: false,
          key: "timeRange",
        },
      ];
      const icon = (
        <HiPlusCircle className="mt-1 mr-5 text-3xl text-green-500"></HiPlusCircle>
      );

      return {
        icon,
        title: "Load Records",
        sucessMessage: "Done",
        errorMessage: "Fail",
        submitBtnColor: "blue",
        onSubmit: async ({ formData }) => {
          try {
            const { machineId } = formData;
            setSelectedMachine(machineId)
            setStartTime(() => {
              if (!formData.timeRange?.from) {
                return undefined
              }
              const startTime = new Date(formData.timeRange.from);
              startTime.setHours(0, 0, 0, 0);
              return startTime.toISOString();
            })
            setEndTime(() => {
              if (!formData.timeRange?.to) {
                return undefined
              }
              const endTime = new Date(formData.timeRange.to);
              endTime.setHours(23, 59, 59, 999);
              return endTime.toISOString();
            })
            await getAllRecords().unwrap();

          } catch (err) {
            const errorModalConfig: PromptModalProps = {
              type: "error",
              title: "Get Record Error",
              message: "Error Loading Record",
              data: JSON.stringify(err, null, 2),
            };
            dispatch(setModal(<PromptModal {...errorModalConfig} />));
          }
        },
        fields,
      };
    } catch (err) {
      throw err;
    }
  }

  const customSort = (rows: Record[], selector: (row: Record) => any, direction: 'asc' | 'desc') => {
    return [...rows].sort((a, b) => {
      const aField = selector(a);
      const bField = selector(b);

      if (typeof aField === 'string') {
        return direction === 'desc' ?
          bField.localeCompare(aField) : aField.localeCompare(bField);
      } else if (typeof aField === 'number') {
        return direction === 'desc' ? bField - aField : aField - bField;
      } else if (aField instanceof Date) {
        return direction === 'desc' ? bField.getTime() - aField.getTime()
          : aField.getTime() - bField.getTime();
      } else {
        return direction === 'desc' ?
          bField.toString().localeCompare(aField.toString()) :
          aField.toString().localeCompare(bField.toString());
      }
    });
  };


  const columns = [
    {
      name: "Module Serial No.",
      selector: (row: Record) => row.moduleSerialNo,
    },
    {
      name: "PLC Date Time",
      selector: (row: Record) => row.systemDt,
    },
    {
      name: "Created At",
      selector: (row: Record) => {
        const dateTime = new Date(row.createdAt);
        return dateTime.toString();
      },
      sortable: true,
      customSort,
    },
    {
      name: "Good/NG",
      selector: (row: Record) => row.result,
      cell: (row: Record) => (
        <div
          className={`text-center py-2 px-4 rounded ${row.result === 1
            ? "bg-green-500 text-white" : row.result === 2
              ? "bg-red-500 text-white"
              : "bg-yellow-500 text-white"
            }`}
        >
          {row.result?.toString() === "1" ? "Good" : row.result?.toString() === "2" ? "NG" : "Unknown"}
        </div>
      ),
    },
  ];


  const customStyles = {
    rows: {
      style: {
        "&:hover": {
          backgroundColor: "#f7fafc",
        },
      },
    },
  };

  const onRowClicked = (row: Record) => {
    dispatch(
      setModal(
        <PromptModal
          {...{
            type: "info",
            title: "Record data",
            data: JSON.stringify(row.recordDatas, null, 2),
            message: `Record Of Module Serial No${row.moduleSerialNo} `,
          }}
        ></PromptModal>
      )
    );
  };

  const onSearchClickHandler = async () => {
    const addModalConfig = await getAllRecordQuerryConfig();
    dispatch(setModal(<GenericFormModal {...addModalConfig} />));
  };

  const dataToCsv = (records: Record[]): string => {
    let csvContent = "data:text/csv;charset=utf-8,";

    const headers = 'Module Serial No,System Date,Result,Created At,OPID,CurDta_QD01,CurDta_QD02,CurDta_QD03,CurDta_QD04,PrvDta1_QD01,PrvDta1_QD02,PrvDta1_QD03,PrvDta1_QD04,PrvDta2_QD01,PrvDta2_QD02,PrvDta2_QD03,PrvDta2_QD04,Try Count,RT,OType,QD01 Min,QD01 Max,QD02 Min,QD02 Max,QD03 Min,QD03 Max,QD04 Min,QD04 Max,Operator Name,OP Text';
    csvContent += headers + "\r\n";

    records.forEach((item) => {
      item.recordDatas.forEach((record) => {
        const row = `${item.moduleSerialNo},${item.systemDt},${item.result},${item.createdAt},${record.OPID},${record.CurDta_QD01},${record.CurDta_QD02},${record.CurDta_QD03},${record.CurDta_QD04},${record.PrvDta1_QD01},${record.PrvDta1_QD02},${record.PrvDta1_QD03},${record.PrvDta1_QD04},${record.PrvDta2_QD01},${record.PrvDta2_QD02},${record.PrvDta2_QD03},${record.PrvDta2_QD04},${record.TryCnt},${record.RT},${record.OType},${record.QD01_Min},${record.QD01_Max},${record.QD02_Min},${record.QD02_Max},${record.QD03_Min},${record.QD03_Max},${record.QD04_Min},${record.QD04_Max},${record.OperatorName.replace(/,/g, ';')},${record.OPTxt.replace(/,/g, ';')}`;
        csvContent += row + "\r\n";
      });
    });

    return csvContent
  }

  const generateXmlForRecord = (records: Record) => {
    const { recordDatas, systemDt, moduleSerialNo } = records;
    const { systemID, lineID, stationID, stationName } = records.machine;
    const recordInfo = {
      lineInfo: {
        SystemID: systemID,
        SystemDT: systemDt,
        ModuleSerialNo: moduleSerialNo,
      },
      stationInfo: {
        LineID: lineID,
        StationName: stationName,
        StationID: stationID,
        PartID: '0',
        Mode: '0',
      },
    };

    const fileName = `${stationName}_${moduleSerialNo}_${systemDt}.xml`;

    let xmlData = '<Data\n';
    xmlData += formatDataForXml(`QD.HDR`, recordInfo.lineInfo) + '\n';
    xmlData +=
      formatDataForXml(`QD.HDR`, recordInfo.stationInfo) +
      ' DBType="QUALITY"\n';
    recordDatas.forEach(async (data, index) => {
      xmlData += formatDataForXml(`QD.DT0${index + 1}`, data) + '\n';
    });
    xmlData += '/>';
    return { fileName, xmlData }
  }

  const downloadXmlAsZip = async (records: Record[]) => {
    const zip = new JSZip();
    const link = document.createElement('a');
    records.forEach((record) => {
      const { fileName, xmlData } = generateXmlForRecord(record);
      zip.file(fileName, xmlData);
    });

    const content = await zip.generateAsync({ type: "blob" });
    const formattedDateTime = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    });

    const url = window.URL.createObjectURL(content);
    const fileName = `${formattedDateTime.replace(/[-:]/g, '')}.zip`
    link.href = url;
    link.download = fileName
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  };

  const formatDataForXml = (prefix: string, data: any): string => {
    return Object.entries(data)
      .map(([key, value]) => {
        return `${prefix}.${key.replace('_', '.')}="${value}"`;
      })
      .join(' ');
  }

  const downloadCSV = (records: Record[]) => {
    const link = document.createElement('a');
    let csv = dataToCsv(records);
    const formattedDateTime = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    });
    const filename = `${formattedDateTime.replace(/[-:]/g, '')}.csv`;

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }

  return (
    <Card className="flex flex-col w-full my-4">
      <div className="flex flex-row justify-between w-full">
        <div className="flex items-center">
          <Title>Record Table</Title>
        </div>
        <div className="flex items-center">
          <Button className="mr-5" onClick={e => onSearchClickHandler()}>search</Button>

          <Button className="mr-5" onClick={e => downloadCSV(recordDatas ? recordDatas : [])}>Export CSV</Button>
          <Button className="mr-5" onClick={e => downloadXmlAsZip(recordDatas ? recordDatas : [])}>Export Xml</Button>
        </div>
      </div>
      <DataTable
        className="font-semibold"
        columns={columns}
        data={recordDatas ? recordDatas : []}
        pagination
        onRowClicked={onRowClicked}
        customStyles={customStyles}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        paginationComponentOptions={{ rowsPerPageText: 'Rows per page:', rangeSeparatorText: 'of' }}
      />
    </Card>
  );
};

export default Record;
