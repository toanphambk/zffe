"use client";
import GenericFormModal, {
  GenericFormModalProps,
} from "@/components/genericFormModal";
import { setModal } from "@/redux/UI/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ProductCategory, {
  useCreateProductCategoryMutation,
  useDeleteProductCategoryMutation,
  useGetAllProductCategoriesQuery,
  useUpdateProductCategoryMutation,
} from "@/redux/services/prodCategory/prodCateApi";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Text,
} from "@tremor/react";
import {
  HiDownload,
  HiMinusCircle,
  HiPencil,
  HiPlus,
  HiPlusCircle,
  HiX,
  HiXCircle,
} from "react-icons/hi";
import SubmitModal, { SubmitModalProps } from "@/components/submitModal";
import PromptModal, { PromptModalProps } from "@/components/promtModal";
import { useState } from "react";
import { setSelectedProductionLine } from "@/redux/UI/settingPageSlice";

const ProdCateTable: React.FC = () => {
  const dispatch = useAppDispatch();

  const { selectedProductionLine: selectedCategory } = useAppSelector(
    (state) => state.settingPageReducer
  );

  const {
    refetch: getAllQuery,
    data: categories,
    isSuccess,
  } = useGetAllProductCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [createMutation] = useCreateProductCategoryMutation();
  const [updateMutation] = useUpdateProductCategoryMutation();
  const [deleteMutation] = useDeleteProductCategoryMutation();
  const [isDisplay, setDisplay] = useState(true);

  function getAddModalConfig(): GenericFormModalProps<ProductCategory, any> {
    const icon = (
      <HiPlusCircle className="mt-1 mr-5 text-3xl text-green-500"></HiPlusCircle>
    );

    return {
      icon,
      title: "Add Product Category",
      sucessMessage: "Added Done",
      errorMessage: "Added Fail",
      submitBtnColor: "blue",
      onSubmit: async ({ formData }) => {
        try {
          await createMutation(formData).unwrap();
          getAllQuery();
        } catch (err) {
          throw err;
        }
      },
      fields: [
        { type: "text", title: "name", require: true },
        { type: "textarea", title: "description", require: false },
      ],
    };
  }

  function getEditModalConfig(
    initData: ProductCategory
  ): GenericFormModalProps<ProductCategory, number> {
    const icon = (
      <div className="mr-2 text-white bg-blue-600 rounded-full cursor-pointer hover:bg-blue-500">
        <HiPencil className="m-1 text-lg"></HiPencil>
      </div>
    );

    return {
      icon,
      title: `Edit Product Category No ${initData.id}`,
      sucessMessage: "Edit Done",
      errorMessage: "Edit Fail",
      submitBtnColor: "blue",
      formInitData: initData,
      onSubmit: async ({ formData }) => {
        try {
          await updateMutation({
            id: formData.id,
            updateDto: formData,
          }).unwrap();
          getAllQuery();
        } catch (err) {
          throw err;
        }
      },
      fields: [
        { type: "text", title: "name", require: false },
        { type: "textarea", title: "description", require: false },
      ],
    };
  }

  function getDeleteModalConfig(
    item: ProductCategory
  ): SubmitModalProps<ProductCategory> {
    const icon = (
      <HiXCircle className="mt-1 mr-5 text-3xl text-red-500"></HiXCircle>
    );

    const childComponent = (
      <div className="flex flex-col w-full mx-5">
        {Object.keys(item).map((key) => (
          <div key={key} className="flex items-center mt-8 ">
            <Text className="w-24 mb-2 ml-5 text-2xl font-semibold text-left text-gray-700 ">
              {key}:
            </Text>
            <Text className="mb-2 ml-5 text-2xl text-left text-gray-700 ">
              {item[key as keyof ProductCategory]}
            </Text>
          </div>
        ))}
      </div>
    );

    return {
      icon,
      childComponent,
      title: "Delete Product Category",
      sucessMessage: "Success Delete",
      errorMessage: "Fail Delete",
      data: item,
      submitBtnColor: "red",
      onSubmit: async ({ data }) => {
        try {
          await deleteMutation(data.id).unwrap();
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

  const onEditClickHandler = (category: ProductCategory) => {
    const editModalConfig = getEditModalConfig(category);
    dispatch(setModal(<GenericFormModal {...editModalConfig} />));
  };
  const onDeleteClickHandler = (item: ProductCategory) => {
    const deleteModalConfig = getDeleteModalConfig(item);
    dispatch(setModal(<SubmitModal {...deleteModalConfig} />));
  };

  const onSelectClickHandler = (item: ProductCategory) => {
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
        title: "Reload Category Error",
        message: "Error Reload Table",
        data: JSON.stringify(err, null, 2),
      };
      dispatch(setModal(<PromptModal {...errorModalConfig} />));
    }
  };

  return (
    <div className="w-full mb-5 bg-white rounded-xl">
      <div
        className={`flex flex-row items-center w-full bg-blue-600 ${
          isDisplay ? "rounded-t-xl" : "rounded-xl"
        }`}
      >
        <Text
          key="title"
          className="flex my-3 ml-10 text-lg font-bold text-white"
        >
          Product Category
        </Text>
        <div className="flex items-center justify-end flex-shrink mx-5 grow">
          <HiDownload
            key="reloadDataBtn"
            type="button"
            onClick={onReloadClickHandler}
            className="p-1 text-2xl font-bold text-blue-500 bg-white rounded-full hover:cursor-pointer hover:bg-gray-200 "
          ></HiDownload>
          <HiMinusCircle
            key="showToggleBtn"
            onClick={onDisplayToggle}
            className="mx-2 text-3xl font-bold text-white mr hover:cursor-pointer hover:text-gray-200"
          ></HiMinusCircle>
        </div>
      </div>
      {isSuccess && isDisplay && (
        <Table className="flex w-full">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="w-1/12 text-xs font-bold text-center text-black ">
                ID
              </TableHeaderCell>
              <TableHeaderCell className="w-1/5 text-xs font-bold text-left text-black">
                Name
              </TableHeaderCell>
              <TableHeaderCell className="text-xs font-bold text-left text-black">
                Description
              </TableHeaderCell>
              <TableHeaderCell className="w-1/6 text-xs font-bold text-center text-black">
                Modify
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((item) => (
              <TableRow
                className={`text-gray-800 font-semibold  text-xs ${
                  item.id == selectedCategory?.id
                    ? "bg-blue-500 text-white "
                    : "hover:bg-blue-100"
                }`}
                key={item.id}
                onClick={() => onSelectClickHandler(item)}
              >
                <TableCell className="text-center cursor-pointer">
                  {item.id}
                </TableCell>
                <TableCell className="text-left cursor-pointer">
                  {item.name}
                </TableCell>
                <TableCell className="text-left cursor-pointer ">
                  {item.description}
                </TableCell>
                <TableCell className="flex flex-row items-center justify-center">
                  <HiPencil
                    className="p-1 mx-2 text-2xl text-white bg-blue-600 rounded-full cursor-pointer"
                    onClick={() => onEditClickHandler(item)}
                  ></HiPencil>
                  <HiX
                    className="p-1 text-2xl text-white bg-red-500 rounded-full cursor-pointer"
                    onClick={() => onDeleteClickHandler(item)}
                  ></HiX>
                </TableCell>
              </TableRow>
            ))}
            <TableRow key="add category">
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="flex flex-col items-center mx-auto">
                <HiPlus
                  className="p-1 mx-2 text-2xl text-white bg-green-500 rounded-full cursor-pointer"
                  onClick={onAddClickHandler}
                ></HiPlus>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ProdCateTable;
