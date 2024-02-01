// GenericFormModal.tsx
import React, { FormEvent, KeyboardEvent, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { removeModal, setModal } from "@/redux/UI/modalSlice";
import { Text, TextInput, Textarea } from "@tremor/react";
import PromptModal from "./promtModal";

export interface GenericFormModalProps<FormData, DataType> {
  icon: React.ReactNode;
  title: string;
  formInitData?: FormData;
  data?: DataType;
  sucessMessage: string;
  errorMessage: string;
  submitBtnColor: string;
  onSubmit: (params: { formData: FormData; data: DataType }) => Promise<any>;
  onCancel?: () => void;
  fields: FieldConfig<FormData>[];
}

export type FieldConfig<T> = {
  title: string;
  type: "text" | "textarea" | "timePicker";
  require: boolean;
  key: keyof T;
  focus?: boolean;
};

const GenericFormModal: React.FC<GenericFormModalProps<any, any>> = ({
  title,
  icon,
  formInitData,
  data,
  submitBtnColor,
  sucessMessage,
  errorMessage,
  onSubmit,
  onCancel,
  fields,
}) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<null | string>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<any>(
    formInitData ? formInitData : {}
  );

  const inputChangeHandler = (val: any, title: any) => {
    setFormData({
      ...formData,
      [title]: val,
    });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({ formData, data });
      setIsSuccess(true);
      setError(null);
      dispatch(
        setModal(
          <PromptModal
            {...{ type: "success", title: "Sucess", message: sucessMessage }}
          ></PromptModal>
        )
      );
    } catch (error) {
      setIsSuccess(false);
      setError(JSON.stringify(error, null, 2));
      dispatch(
        setModal(
          <PromptModal
          {...{
            type: "error",
            title: "Error",
            data: JSON.stringify(error, null, 2),
            message: errorMessage,
          }}
        ></PromptModal>
        )
      );
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitHandler(event as unknown as FormEvent<HTMLFormElement>);
    } else if (event.key === "Escape") {
      removeModalHandler();
    }
  };

  const removeModalHandler = () => {
    onCancel?.();
    setIsSuccess(false);
    setError(null);
    dispatch(removeModal());
  };

  return (
    <form
      className="flex flex-col bg-white shadow-xl rounded-xl"
      onSubmit={submitHandler}
      onKeyDown={handleKeyPress}
    >
      <div className="flex flex-row items-center justify-center mx-12 mt-8">
        {icon}
        <div className="text-2xl font-semibold text-black ">{title}</div>
      </div>

      {fields.map((field, index) => (
        <div key={index} className="flex justify-between mx-5 mt-5">
          <Text className="w-32 mx-2 mt-1 mb-2 text-2xl font-semibold text-left text-gray-800">
            {field.title}
          </Text>
          {(() => {
            switch (field.type) {
              case "textarea":
                return (
                  <Textarea
                    className="w-full h-20 px-4 py-2 ml-1 text-sm text-gray-900 rounded-md shadow-sm ring-1 focus:outline-none ring-gray-200 focus:ring-gray-200 focus:ring-1 placeholder:text-gray-500"
                    placeholder={field.title}
                    required={field.require}
                    value={formData[field.key]}
                    onChange={(e) =>
                      inputChangeHandler(e.target.value, field.key)
                    }
                    autoFocus={field.focus}
                  />
                );
              case "text":
                return (
                  <TextInput
                    className="w-full text-sm text-gray-900 rounded-md shadow-sm ring-1 focus:outline-none ring-gray-200 focus:ring-gray-200 focus:ring-1 placeholder:text-gray-500"
                    placeholder={field.title}
                    required={field.require}
                    value={formData[field.key]}
                    onChange={(e) =>
                      inputChangeHandler(e.target.value, field.key)
                    }
                    autoFocus={field.focus}
                  />
                );
              case "timePicker":
                return (
                  <div className="flex flex-row items-center w-full">
                    <input
                      placeholder={field.title}
                      className="text-black rounded-md ring-0"
                      type="time"
                      id="appt"
                      name="appt"
                      value={formData[field.key]}
                      onChange={(e) =>
                        inputChangeHandler(e.target.value, field.key)
                      }
                      autoFocus={field.focus}
                      required={field.require}
                    />
                  </div>
                );
            }
          })()}
        </div>
      ))}

      <div className="flex flex-row-reverse items-center px-6 py-3 mt-5 bg-gray-100 rounded-xl">
        <button
          className="w-20 h-10 ml-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={removeModalHandler}
        >
          Cancel
        </button>
        <button
          className={`w-20 h-10 text-sm font-semibold text-white bg-${submitBtnColor}-600 rounded-md shadow-sm  hover:bg-${submitBtnColor}-500`}
          type="submit"
          value="Submit"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default GenericFormModal;
