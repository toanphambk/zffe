import PromptModal, { PromptModalProps } from "@/components/promtModal";
import { setModal } from "@/redux/UI/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Record, useMesControllerFindAllRecordByMachineAndDateTimeQuery } from "@/redux/services/api";
import { Button, Card, Title } from "@tremor/react";
import JSZip from "jszip";
import React from "react";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { HiRefresh } from "react-icons/hi";

const getCurrrentDateTime = () => {
  const currentDay = new Date()
  currentDay.setHours(0, 0, 0, 0);
  return currentDay.toISOString();
}

const ShiftRecordTable: React.FC = () => {
  const dispatch = useAppDispatch();


  const [currentTime, setCurrentTime] = useState(() => getCurrrentDateTime());

  const { machine: settingMachine } = useAppSelector(
    (state) => state.appSettingReducer
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrrentDateTime());
      getAllQuery().unwrap();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const {
    refetch: getAllQuery,
    data: recordDatas,
  } = useMesControllerFindAllRecordByMachineAndDateTimeQuery({
    machineId: settingMachine? settingMachine.id : 0  ,
    startTime: currentTime,
  },
    {
      skip: typeof settingMachine === "undefined",
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

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
      right: true,
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

  const onReloadClickHandler = async () => {
    try {
      const result = await getAllQuery().unwrap();
    } catch (err) {
      const errorModalConfig: PromptModalProps = {
        type: "error",
        title: "Error",
        message: "Load Record Error",
        data: JSON.stringify(err, null, 2),
      };
      dispatch(setModal(<PromptModal {...errorModalConfig} />));
    }
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
    console.log(records);
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
    const formattedDateTime = new Date(currentTime).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    });

    const url = window.URL.createObjectURL(content);
    const fileName = `${settingMachine?.systemID}_${formattedDateTime.replace(/[-:]/g, '')}.zip`
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
    const formattedDateTime = new Date(currentTime).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    });
    const filename = `${settingMachine?.systemID}_${formattedDateTime.replace(/[-:]/g, '')}.csv`;

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
          <HiRefresh
            type="button"
            onClick={onReloadClickHandler}
            className="p-1 mx-5 text-2xl font-bold text-white bg-blue-900 rounded-full hover:cursor-pointer hover:bg-blue-700 "
          ></HiRefresh>
        </div>
        <div className="flex items-center">
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

export default ShiftRecordTable;
