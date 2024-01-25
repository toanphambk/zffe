// GenericFormModal.tsx
import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { removeModal } from "@/redux/UI/modalSlice";
import PromptModal from "./promtModal";

export interface SubmitModalProps<DataType> {
  icon: React.ReactNode;
  title: string;
  formInitData?: FormData;
  data?: DataType;
  sucessMessage: string;
  errorMessage: string;
  submitBtnColor: string;
  childComponent: React.ReactNode;
  onSubmit: (params: { data: DataType }) => Promise<any>;
  onCancel?: () => void;
}

const SubmitModal: React.FC<SubmitModalProps<any>> = ({
  title,
  icon,
  data,
  sucessMessage,
  errorMessage,
  submitBtnColor,
  childComponent,
  onSubmit,
  onCancel,
}) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({ data });
      setIsSuccess(true);
      setError(null);
    } catch (error) {
      setIsSuccess(false);
      setError(JSON.stringify(error, null, 2));
    }
  };

  const removeModalHandler = () => {
    onCancel?.();
    setIsSuccess(false);
    setError(false);
    dispatch(removeModal());
  };

  if (error) {
    return (
      <PromptModal
        {...{
          type: "error",
          title: "Error",
          data: JSON.stringify(error, null, 2),
          message: errorMessage,
        }}
      ></PromptModal>
    );
  }

  if (isSuccess) {
    return (
      <PromptModal
        {...{ type: "success", title: "Sucess", message: sucessMessage }}
      ></PromptModal>
    );
  }

  return (
    <form
      className="flex flex-col bg-white shadow-xl rounded-xl"
      onSubmit={submitHandler}
    >
      <div className="flex flex-row items-center justify-center mx-10 mt-8">
        {icon}
        <div className="text-2xl font-semibold text-black">{title}</div>
      </div>
      {childComponent}
      <div className="flex flex-row-reverse items-center px-6 py-3 mt-5 bg-gray-100 rounded-xl">
        <button
          className="w-20 h-10 ml-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={removeModalHandler}
        >
          Cancel
        </button>
        <button
          className={`w-20 h-10 text-sm font-semibold text-white bg-${submitBtnColor}-600 rounded-md shadow-sm ring-1 hover:bg-${submitBtnColor}-500`}
          type="submit"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default SubmitModal;
