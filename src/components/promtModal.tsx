import { removeModal } from "@/redux/UI/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import React, { KeyboardEvent, useMemo } from "react";
import { HiCheckCircle, HiInformationCircle, HiXCircle } from "react-icons/hi";

export interface PromptModalProps {
  type: "success" | "error" | "info";
  data?: string;
  message: string;
  title: string;
  onClose?: () => void;
}

interface PromptModalData {
  icon: React.ReactNode;
  childComponent?: React.ReactNode;
}

const PromptModal: React.FC<PromptModalProps> = ({
  type,
  message,
  data,
  title,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const removeModalHandler = () => {
    onClose?.();
    dispatch(removeModal());
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Escape") {
      removeModalHandler();
    }
  };

  const { icon, childComponent } = useMemo((): PromptModalData => {
    switch (type) {
      case "success":
        return {
          icon: (
            <HiCheckCircle className="mx-2 mt-1 text-2xl text-blue-500"></HiCheckCircle>
          ),
        };

      case "info":
        return {
          icon: (
            <HiInformationCircle className="mx-2 text-3xl text-blue-500"></HiInformationCircle>
          ),
          childComponent: (
            <div className="flex flex-row items-center px-5 py-4 mx-5 mt-4 bg-gray-800 rounded-lg">
              <pre className="font-mono text-sm text-left text-white">
                {data}
              </pre>
            </div>
          ),
        };

      default:
        return {
          icon: <HiXCircle className="mx-2 text-3xl text-red-500"></HiXCircle>,
          childComponent: (
            <div className="flex flex-row items-center px-5 py-4 mx-5 mt-4 bg-gray-800 rounded-lg">
              <pre className="font-mono text-sm text-left text-white">
                {data}
              </pre>
            </div>
          ),
        };
    }
  }, [type, data]);

  return (
    <form
      className="flex flex-col text-black bg-white shadow-xl rounded-xl"
      onKeyDown={handleKeyPress}
    >
      <div className="flex flex-row items-center justify-center mt-8">
        {icon}
        <div className="text-2xl font-semibold text-black">{title}</div>
      </div>
      <div className="flex flex-row items-center justify-center mx-20 mt-6">
        <div className="font-semibold text-black text-md">{message}</div>
      </div>
      {childComponent}
      <div className="flex flex-row-reverse items-center px-6 py-3 mt-5 bg-gray-100 rounded-xl">
        <button
          type="button"
          className="w-20 h-10 ml-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={removeModalHandler}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PromptModal;
