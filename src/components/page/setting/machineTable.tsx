"use client";
import GenericFormModal, {
  FieldConfig,
  GenericFormModalProps,
} from "@/components/genericFormModal";
import { setModal } from "@/redux/UI/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Text, Card, Title, Button } from "@tremor/react";
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
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import {
  Machine,
  useMachineControllerCreateMutation,
  useMachineControllerFindAllQuery,
  useMachineControllerRemoveMutation,
  useMachineControllerUpdateMutation,
} from "@/redux/services/api";
import { setAppSettingMachine } from "@/redux/data/appSettingSlice";

const MachineTable: React.FC = () => {
  const dispatch = useAppDispatch();

  const { machine: settingMachine } = useAppSelector(
    (state) => state.appSettingReducer
  );

  const {
    refetch: getAllQuery,
    data: machine,
    status,
  } = useMachineControllerFindAllQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [createMutation] = useMachineControllerCreateMutation();
  const [updateMutation] = useMachineControllerUpdateMutation();
  const [deleteMutation] = useMachineControllerRemoveMutation();
  const [isDisplay, setDisplay] = useState(true);

  const columns = [
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
    {
      name: "Actions",
      right: true,
      cell: (row: Machine) => (
        <>\
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

  const conditionalRowStyles = [
    {
      when: (row: Machine) => row.id === settingMachine?.id,
      classNames: [
        "bg-blue-500 text-white hover:bg-blue-200 hover:cursor-pointer font-semibold",
      ],
    },
    {
      when: (row: Machine) => row.id !== settingMachine?.id,
      classNames: [
        "bg-white text-black hover:bg-blue-200 hover:cursor-pointer font-semibold",
      ],
    },
  ];

  const fields: FieldConfig<Machine>[] = [
    {
      type: "text",
      title: "System ID",
      require: true,
      key: "systemID",
    },
    {
      type: "text",
      title: "Line ID",
      require: true,
      key: "lineID"
    },
    {
      type: "text",
      title: "Station Name",
      require: true,
      key: "stationName",
    },
    {
      type: "text",
      title: "Station ID",
      require: true,
      key: "stationID",
    },
    {
      type: "textarea",
      title: "Description",
      require: false,
      key: "description",
    },
    {
      type: "text",
      title: "IP Address",
      require: true,
      key: "ip",
    },
  ];

  function getAddModalConfig(): GenericFormModalProps<Machine, any> {
    const icon = (
      <HiPlusCircle className="mt-1 mr-5 text-3xl text-green-500"></HiPlusCircle>
    );

    return {
      icon,
      title: "Add machine",
      sucessMessage: "Added Done",
      errorMessage: "Added Fail",
      submitBtnColor: "blue",
      onSubmit: async ({ formData }) => {
        try {
          await createMutation({ createMachineDto: formData }).unwrap();
          getAllQuery();
        } catch (err) {
          throw err;
        }
      },
      fields,
    };
  }

  function getEditModalConfig(
    initData: Machine
  ): GenericFormModalProps<Machine, number> {
    const icon = (
      <div className="mr-2 text-white bg-blue-600 rounded-full cursor-pointer hover:bg-blue-500">
        <HiPencil className="m-1 text-lg"></HiPencil>
      </div>
    );

    return {
      icon,
      title: `Edit machine No ${initData.id}`,
      sucessMessage: "Edit Done",
      errorMessage: "Edit Fail",
      submitBtnColor: "blue",
      formInitData: initData,
      onSubmit: async ({ formData }) => {
        try {
          await updateMutation({
            id: formData.id.toString(),
            updateMachineDto: formData,
          }).unwrap();
          getAllQuery();
          if (settingMachine?.id === formData.id) {
            dispatch(setAppSettingMachine(formData));
          }
        } catch (err) {
          throw err;
        }
      },
      fields,
    };
  }

  function getDeleteModalConfig(
    item: Machine
  ): SubmitModalProps<Machine> {
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
              {val}
            </Text>
          </div>
        ))}
      </div>
    );

    return {
      icon,
      childComponent,
      title: "Delete machine",
      sucessMessage: "Success Delete",
      errorMessage: "Fail Delete",
      data: item,
      submitBtnColor: "red",
      onSubmit: async ({ data }) => {
        try {
          await deleteMutation({ id: data.id.toString() }).unwrap();
          if (settingMachine?.id === data.id) {
            dispatch(setAppSettingMachine(undefined));
          }
          getAllQuery();
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

  const onEditClickHandler = (item: Machine) => {
    const editModalConfig = getEditModalConfig(item);
    dispatch(setModal(<GenericFormModal {...editModalConfig} />));
  };
  const onDeleteClickHandler = (item: Machine) => {
    const deleteModalConfig = getDeleteModalConfig(item);
    dispatch(setModal(<SubmitModal {...deleteModalConfig} />));
  };

  const onDisplayToggle = async () => {
    setDisplay(!isDisplay);
  };

  const onReloadClickHandler = async () => {
    try {
      const data = await getAllQuery().unwrap();
    } catch (err) {
      const errorModalConfig: PromptModalProps = {
        type: "error",
        title: "Reload Cate<gory Error",
        message: "Error Reload Table",
        data: JSON.stringify(err, null, 2),
      };
      dispatch(setModal(<PromptModal {...errorModalConfig} />));
    }
  };

  const onRowClicked = (row: Machine) => {
    dispatch(setAppSettingMachine(row));
  };

  return (
    <>
      <Card className="flex flex-col w-full my-4">
        <div className="flex flex-row justify-between w-full">
          <div className="flex items-center">
            <Title>Edit Machine Setting</Title>
            <HiRefresh
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
          columns={columns}
          data={machine ? machine : []}
          conditionalRowStyles={conditionalRowStyles}
          onRowClicked={onRowClicked}
        />
      </Card>
    </>
  );
};

export default MachineTable;
