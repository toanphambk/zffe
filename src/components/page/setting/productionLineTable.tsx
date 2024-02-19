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
import { useState } from "react";
import { setSelectedProductionLine } from "@/redux/UI/settingPageSlice";
import DataTable from "react-data-table-component";

import {
  ProductionLine,
  useProductionLineControllerCreateMutation,
  useProductionLineControllerFindAllQuery,
  useProductionLineControllerRemoveMutation,
  useProductionLineControllerUpdateMutation,
} from "@/redux/services/api";

const ProductionLineTable: React.FC = () => {
  const dispatch = useAppDispatch();

  const { selectedProductionLine } = useAppSelector(
    (state) => state.settingPageReducer
  );

  const {
    refetch: getAllQuery,
    data: categories,
    isSuccess,
  } = useProductionLineControllerFindAllQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [createMutation] = useProductionLineControllerCreateMutation();
  const [updateMutation] = useProductionLineControllerUpdateMutation();
  const [deleteMutation] = useProductionLineControllerRemoveMutation();
  const [isDisplay, setDisplay] = useState(true);

  const columns = [
    {
      name: "System ID",
      selector: (row: ProductionLine) => row.systemID,
    },
    {
      name: "Line ID",
      selector: (row: ProductionLine) => row.lineID,
    },
    {
      name: "Station Name",
      selector: (row: ProductionLine) => row.stationName,
    },
    {
      name: "Station ID",
      selector: (row: ProductionLine) => row.stationID,
    },
    {
      name: "Description",
      selector: (row: ProductionLine) => row.description,
    },
    {
      name: "IP Address",
      selector: (row: ProductionLine) => row.ipAddress,
    },
    {
      name: "Actions",
      right: true,
      cell: (row: ProductionLine) => (
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

  const conditionalRowStyles = [
    {
      when: (row: ProductionLine) => row.id === selectedProductionLine?.id,
      classNames: ["bg-blue-400 text-white hover:cursor-pointer font-semibold"],
    },
    {
      when: (row: ProductionLine) => row.id !== selectedProductionLine?.id,
      classNames: [
        "bg-white text-black hover:bg-blue-200 hover:cursor-pointer font-semibold",
      ],
    },
  ];

  const fields: FieldConfig<ProductionLine>[] = [
    { type: "text", title: "ID", require: true, key: "id" },
    {
      type: "text",
      title: "System ID",
      require: true,
      key: "systemID",
    },
    { type: "text", title: "Line ID", require: true, key: "lineID" },
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
      key: "ipAddress",
    },
  ];

  function getAddModalConfig(): GenericFormModalProps<ProductionLine, any> {
    const icon = (
      <HiPlusCircle className="mt-1 mr-5 text-3xl text-green-500"></HiPlusCircle>
    );

    return {
      icon,
      title: "Add Production Line",
      sucessMessage: "Added Done",
      errorMessage: "Added Fail",
      submitBtnColor: "blue",
      onSubmit: async ({ formData }) => {
        try {
          await createMutation({ createProductionLineDto: formData }).unwrap();
          getAllQuery();
        } catch (err) {
          throw err;
        }
      },
      fields,
    };
  }

  function getEditModalConfig(
    initData: ProductionLine
  ): GenericFormModalProps<ProductionLine, number> {
    const icon = (
      <div className="mr-2 text-white bg-blue-600 rounded-full cursor-pointer hover:bg-blue-500">
        <HiPencil className="m-1 text-lg"></HiPencil>
      </div>
    );

    return {
      icon,
      title: `Edit Production Line No ${initData.id}`,
      sucessMessage: "Edit Done",
      errorMessage: "Edit Fail",
      submitBtnColor: "blue",
      formInitData: initData,
      onSubmit: async ({ formData }) => {
        try {
          await updateMutation({
            id: formData.id.toString(),
            updateProductionLineDto: formData,
          }).unwrap();
          getAllQuery();
        } catch (err) {
          throw err;
        }
      },
      fields,
    };
  }

  function getDeleteModalConfig(
    item: ProductionLine
  ): SubmitModalProps<ProductionLine> {
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
      title: "Delete Production Line",
      sucessMessage: "Success Delete",
      errorMessage: "Fail Delete",
      data: item,
      submitBtnColor: "red",
      onSubmit: async ({ data }) => {
        try {
          await deleteMutation({ id: data.id.toString() }).unwrap();
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

  const onEditClickHandler = (item: ProductionLine) => {
    const editModalConfig = getEditModalConfig(item);
    dispatch(setModal(<GenericFormModal {...editModalConfig} />));
  };
  const onDeleteClickHandler = (item: ProductionLine) => {
    const deleteModalConfig = getDeleteModalConfig(item);
    dispatch(setModal(<SubmitModal {...deleteModalConfig} />));
  };

  const onSelectClickHandler = (item: ProductionLine) => {
    dispatch(setSelectedProductionLine(item));
  };

  const onDisplayToggle = async () => {
    setDisplay(!isDisplay);
  };

  const onReloadClickHandler = async () => {
    try {
      await getAllQuery().unwrap();
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

  const onRowClicked = (row: ProductionLine) => {
    dispatch(setSelectedProductionLine(row));
  };

  return (
    <Card className="flex flex-col w-full my-4">
      <div className="flex flex-row justify-between w-full">
        <div className="flex items-center">
          <Title>Line Table</Title>
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
        data={categories ? categories : []}
        conditionalRowStyles={conditionalRowStyles}
        onRowClicked={onRowClicked}
      />
    </Card>
  );
};

export default ProductionLineTable;
