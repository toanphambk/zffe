"use client";

import { Text, TextInput } from "@tremor/react";
import { HiBell, HiLogout, HiQrcode, HiSearch } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { menuItems } from "@/redux/UI/sideBarSlice";
import Link from "next/link";
import GenericFormModal, {
  FieldConfig,
  GenericFormModalProps,
} from "./genericFormModal";
import {
  Machine,
  Qrcode, useHardwareActionControllerCreateQrCodeMutation,
} from "@/redux/services/api";
import { setModal } from "@/redux/UI/modalSlice";
import PromptModal from "./promtModal";
import { Modal, ModalFuncProps } from "antd";

export const TopBar: React.FC = () => {
  const dispatch = useAppDispatch();

  const { activeIndex } = useAppSelector((state) => state.sidebarReducer);
  const { user } = useAppSelector((state) => state.authReducer);
  const { machine } = useAppSelector((state) => state.appSettingReducer);
  const [createMutation] = useHardwareActionControllerCreateQrCodeMutation();

  const currentPageName =
    activeIndex !== -1 ? menuItems[activeIndex].label : "Unknown Page";
  const currentItem = menuItems[activeIndex];

  const fields: FieldConfig<Qrcode>[] = [
    { type: "text", title: "Code", require: true, key: "code", focus: true },
  ];

  const onScanClickHandler = () => {
    const addModalConfig = getScanConfig();
    dispatch(setModal(<GenericFormModal {...addModalConfig} />));
  };

  function getScanConfig(): GenericFormModalProps<Qrcode, Machine> {
    const icon = (
      <HiQrcode className="mt-1 mr-5 text-3xl text-blue-600"></HiQrcode>
    );

    if (machine === undefined) {
      throw ("Please setup machine");
    }

    return {
      icon,
      title: "Scan Barcode",
      sucessMessage: "Sucess",
      errorMessage: "Fail",
      submitBtnColor: "blue",
      onSubmit: async ({ formData }) => {
        try {
          let response = await createMutation({
            createQrCodeDto: { code: formData.code, machine },
          }).unwrap();
          if (response) {
            setTimeout(() => {
              const scanConfig = getScanConfig();
              dispatch(setModal(<GenericFormModal {...scanConfig} />));
            }, 2000);
          }
        } catch (err) {
          throw err;
        }
      },
      fields,
    };
  }

  return (
    <div className="flex flex-row justify-between w-full mt-2 mb-3">
      <div className="flex flex-col mt-3">
        <div className="flex flex-row">
          <currentItem.icon className="mr-2 text-lg font-bold text-blue-500"></currentItem.icon>
          <Text className="font-bold text-gray-800 text-md">
            {currentPageName}
          </Text>
        </div>
        <div className="flex flex-row">
          <Text className="font-bold text-gray-500 text-md">
            {user?.role?.name}/
          </Text>
          <Text className="font-bold text-black text-md">
            {JSON.stringify(user?.email)}
          </Text>
        </div>
      </div>
      <div className="flex items-center mr-5">
        <div
          className="flex flex-row items-center h-10 px-10 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm cursor-pointer hover:bg-blue-500"
          onClick={onScanClickHandler}
        >
          <HiQrcode className="text-xl "></HiQrcode>
          <div>Scan</div>
        </div>
        {/* <TextInput icon={HiSearch} placeholder="Search..." /> */}
        <HiBell className="ml-5 text-2xl text-blue-500 hover:cursor-pointer" />
        <Link href={"/login"}>
          <HiLogout className="ml-5 text-2xl text-blue-500 hover:cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
