import PromptModal, { PromptModalProps } from "@/components/promtModal";
import { setModal } from "@/redux/UI/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Card, Title } from "@tremor/react";
import DataTable from "react-data-table-component";

interface RowData {
  partId: string;
  operatorName: string;
  shift: number;
  goodNg: string;
  time: String;
  model: string;
}

const columns = [
  {
    name: "Part ID",
    selector: (row: RowData) => row.partId,
  },
  {
    name: "Operator Name",
    selector: (row: RowData) => row.operatorName,
  },
  {
    name: "Shift",
    selector: (row: RowData) => row.shift,
  },
  {
    name: "Good/NG",
    selector: (row: RowData) => row.goodNg,
    cell: (row: RowData) => (
      <div
        className={`text-center py-2 px-4 rounded ${
          row.goodNg == "Good"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {row.goodNg}
      </div>
    ),
  },
  {
    name: "Time",
    selector: (row: RowData) => row.time,
  },
  {
    name: "Model",
    selector: (row: RowData) => row.model,
  },
];

const customStyles = {
  rows: {
    style: {
      "&:hover": {
        backgroundColor: "#f7fafc", // Tailwind class for gray background on hover
      },
    },
  },
};

const data = [
  {
    partId: "12345",
    operatorName: "John Doe",
    shift: 1,
    goodNg: "Good",
    time: "2024-01-06T08:00:00Z",
    model: "Model A",
  },
  {
    partId: "12346",
    operatorName: "Jane Smith",
    shift: 2,
    goodNg: "NG",
    time: "2024-01-06T12:30:00Z",
    model: "Model B",
  },
  {
    partId: "12347",
    operatorName: "Alice Johnson",
    shift: 3,
    goodNg: "Good",
    time: "2024-01-06T20:15:00Z",
    model: "Model C",
  },
  {
    partId: "12348",
    operatorName: "Bob Brown",
    shift: 1,
    goodNg: "Good",
    time: "2024-01-07T08:45:00Z",
    model: "Model A",
  },
  {
    partId: "12349",
    operatorName: "Charlie Davis",
    shift: 2,
    goodNg: "NG",
    time: "2024-01-07T13:20:00Z",
    model: "Model B",
  },
];

const ShiftRecordTable: React.FC = () => {
  const dispatch = useAppDispatch();

  const onRowClicked = (row: RowData) => {
    dispatch(
      setModal(
        <PromptModal
          {...{
            type: "info",
            title: "Record data",
            data: JSON.stringify(row, null, 2),
            message: `${row.partId} record`,
          }}
        ></PromptModal>
      )
    );
  };

  return (
    <Card className="flex flex-col w-full my-4">
      <Title>Record Table</Title>
      <DataTable
        className="font-semibold"
        columns={columns}
        data={data}
        pagination
        customStyles={customStyles}
        onRowClicked={onRowClicked}
      />
    </Card>
  );
};

export default ShiftRecordTable;
