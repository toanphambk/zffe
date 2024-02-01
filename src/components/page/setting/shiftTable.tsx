"use client";
import GenericFormModal, {
  FieldConfig,
  GenericFormModalProps,
} from "@/components/genericFormModal";
import { setModal } from "@/redux/UI/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Text, Card, Title } from "@tremor/react";
import {
  HiPencil,
  HiPlus,
  HiPlusCircle,
  HiRefresh,
  HiX,
  HiXCircle,
} from "react-icons/hi";
import SubmitModal, { SubmitModalProps } from "@/components/submitModal";
import PromptModal, { PromptModalProps } from "@/components/promtModal";
import { useState } from "react";
import DataTable from "react-data-table-component";
import {
  ProductionLine,
  Shift,
  useShiftControllerCreateMutation,
  useShiftControllerFindAllQuery,
  useShiftControllerRemoveMutation,
  useShiftControllerUpdateMutation,
} from "../../../redux/services/api";
import {
  useProductionLineControllerCreateMutation,
  useProductionLineControllerFindAllQuery,
  useProductionLineControllerRemoveMutation,
  useProductionLineControllerUpdateMutation,
} from "@/redux/services/api";

const ShiftTable: React.FC = () => {
  const dispatch = useAppDispatch();

  const { selectedProductionLine } = useAppSelector(
    (state) => state.settingPageReducer
  );

  const {
    refetch: getAllQuery,
    data: categories,
    isSuccess,
  } = useShiftControllerFindAllQuery(
    selectedProductionLine ? { id: selectedProductionLine.id } : {},
    {
      skip: !Boolean(selectedProductionLine),
    }
  );

  const [createMutation] = useShiftControllerCreateMutation();
  const [updateMutation] = useShiftControllerUpdateMutation();
  const [deleteMutation] = useShiftControllerRemoveMutation();
  const [isDisplay, setDisplay] = useState(true);

  const columns = [
    {
      name: "Shift Name",
      selector: (row: Shift) => row.shiftName,
    },
    {
      name: "Start Time",
      selector: (row: Shift) => row.startTime,
    },
    {
      name: "End Time",
      selector: (row: Shift) => row.endTime,
    },
    {
      name: "Actions",
      button: true,
      cell: (row: Shift) => (
        <>
          <HiPencil
            className="p-1 mx-2 text-2xl text-white bg-blue-600 rounded-full"
            onClick={() => onEditClickHandler(row)}
          ></HiPencil>

          <HiX
            className="p-1 text-2xl text-white bg-red-500 rounded-full"
            onClick={() => onDeleteClickHandler(row)}
          ></HiX>
        </>
      ),
    },
  ];

  const customStyles = [
    {
      when: (row: ProductionLine) => row.id,
      classNames: [
        "bg-white text-black hover:bg-blue-200 hover:cursor-pointer ",
      ],
    },
  ];

  const fields: FieldConfig<Shift>[] = [
    {
      type: "text",
      title: "Shift Name",
      require: true,
      key: "shiftName",
    },
    {
      type: "timePicker",
      title: "Start Time",
      require: true,
      key: "startTime",
    },
    { type: "timePicker", title: "End Time", require: true, key: "endTime" },
  ];

  function getAddModalConfig(): GenericFormModalProps<Shift, ProductionLine> {
    const icon = (
      <HiPlusCircle className="mt-1 mr-5 text-3xl text-green-500"></HiPlusCircle>
    );

    return {
      icon,
      title: "Add Shift",
      sucessMessage: "Added Done",
      data: selectedProductionLine,
      errorMessage: "Added Fail",
      submitBtnColor: "blue",
      onSubmit: async ({ formData }) => {
        try {
          await createMutation({
            createShiftDto: {
              ...formData,
              productionLine: selectedProductionLine
                ? selectedProductionLine
                : {},
            },
          }).unwrap();
          getAllQuery().unwrap();
        } catch (err) {
          throw err;
        }
      },
      fields,
    };
  }

  function getEditModalConfig(
    initData: Shift
  ): GenericFormModalProps<Shift, number> {
    const icon = (
      <div className="mr-2 text-white bg-blue-600 rounded-full cursor-pointer hover:bg-blue-500">
        <HiPencil className="m-1 text-lg"></HiPencil>
      </div>
    );

    return {
      icon,
      title: `Edit Shift  ${initData.shiftName}`,
      sucessMessage: "Edit Done",
      errorMessage: "Edit Fail",
      submitBtnColor: "blue",
      formInitData: initData,
      onSubmit: async ({ formData }) => {
        try {
          await updateMutation({
            id: formData.id,
            updateShiftDto: formData,
          }).unwrap();
          getAllQuery().unwrap();
        } catch (err) {
          throw err;
        }
      },
      fields: fields.filter((field) => field.type !== "timePicker"),
    };
  }

  function getDeleteModalConfig(item: Shift): SubmitModalProps<Shift> {
    const icon = (
      <HiXCircle className="mt-1 mr-5 text-3xl text-red-500"></HiXCircle>
    );
    const fields = Object.entries(item);
    const childComponent = (
      <div className="flex flex-col w-full mx-5">
        {fields.map(([key, val]) => (
          <div key={key[0]} className="flex items-center mt-8 ">
            <Text className="w-24 mb-2 ml-5 text-2xl font-semibold text-left text-gray-700 ">
              {key}:
            </Text>
            <Text className="mb-2 ml-5 text-2xl text-left text-gray-700 ">
              {val ? val : ""}
            </Text>
          </div>
        ))}
      </div>
    );

    return {
      icon,
      childComponent,
      title: `Delete Shift ${item.shiftName}`,
      sucessMessage: "Success Delete",
      errorMessage: "Fail Delete",
      data: item,
      submitBtnColor: "red",
      onSubmit: async ({ data }) => {
        try {
          await deleteMutation({ id: data.id }).unwrap();
          getAllQuery().unwrap();
        } catch (err) {
          throw err;
        }
      },
    };
  }

  const onAddClickHandler = () => {
    const addModalConfig = getAddModalConfig();
    dispatch(setModal(<GenericFormModal {...addModalConfig} />));
  };

  const onEditClickHandler = (item: Shift) => {
    const editModalConfig = getEditModalConfig(item);
    dispatch(setModal(<GenericFormModal {...editModalConfig} />));
  };
  const onDeleteClickHandler = (item: Shift) => {
    const deleteModalConfig = getDeleteModalConfig(item);
    dispatch(setModal(<SubmitModal {...deleteModalConfig} />));
  };

  // const onSelectClickHandler = (item: Shift) => {
  //   dispatch(setSelectedProductionLine(item));
  // };

  const onDisplayToggle = async () => {
    setDisplay(!isDisplay);
  };

  const onReloadClickHandler = async () => {
    try {
      await getAllQuery().unwrap();
    } catch (err) {
      const errorModalConfig: PromptModalProps = {
        type: "error",
        title: "Reload Category Error",
        message: "Error Reload Table",
        data: JSON.stringify(err, null, 2),
      };
      dispatch(setModal(<PromptModal {...errorModalConfig} />));
    }
  };

  const onRowClicked = (row: Shift) => {
    dispatch(
      setModal(
        <PromptModal
          {...{
            type: "info",
            title: "Record data",
            data: JSON.stringify(row, null, 2),
            message: `${row.id} record`,
          }}
        ></PromptModal>
      )
    );
  };

  return (
    <Card className="flex flex-col w-full my-4">
      <div className="flex flex-row justify-between w-full">
        <div className="flex items-center">
          <Title>Shift Table</Title>
          <HiRefresh
            key="reloadDataBtn"
            type="button"
            onClick={onReloadClickHandler}
            className="p-1 mx-5 text-2xl font-bold text-white bg-blue-900 rounded-full hover:cursor-pointer hover:bg-blue-700 "
          ></HiRefresh>
        </div>

        <HiPlus
          className="p-1 mx-2 text-2xl text-white bg-green-500 rounded-full cursor-pointer"
          onClick={onAddClickHandler}
        ></HiPlus>
      </div>

      <DataTable
        className="font-semibold"
        columns={columns}
        data={categories ? categories : []}
        conditionalRowStyles={customStyles}
        onRowClicked={onRowClicked}
      />
    </Card>
  );
};

export default ShiftTable;
