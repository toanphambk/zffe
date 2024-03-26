"use client";
import { Inter } from "next/font/google";
import SideBar from "@/components/sideBar";
import { TopBar } from "@/components/topBar";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Modal from "@/components/modal";
import { useEffect, useState } from "react";
import { useAuthControllerMeQuery, useHardwareActionControllerCreateQrCodeMutation, useHardwareActionControllerCreateRfidMutation } from "@/redux/services/api";
import { SetSidebarActiveIndex } from "@/redux/UI/sideBarSlice";
import { SerialPortService } from "@/service/serialPortService";
import { setModal } from "@/redux/UI/modalSlice";
import PromptModal from "@/components/promtModal";
import { App } from "antd";

const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [createRFIDMutation] = useHardwareActionControllerCreateRfidMutation();
  const [createQrCodeMutation] = useHardwareActionControllerCreateQrCodeMutation();
  const { isError, isSuccess } = useAuthControllerMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const { machine } = useAppSelector((state) => state.appSettingReducer);

  const { rfid: rfidSettings, scanner: scannerSetting } = useAppSelector(
    (state) => state.portsSettingReducer
  );


  const sendRfidData = async (data: string) => {
    if (machine === undefined) {
      dispatch(
        setModal(
          <PromptModal
            {...{ type: "error", title: "Error", message: "Please setup machine" }}
          ></PromptModal>
        )
      );
      return;
    }
    try {
      await createRFIDMutation({
        createRfidDto: { code: data, machine: machine },
      });
    } catch (error) {
      console.error("Error sending rfid data:", error);
    }
  }

  const sendScannerData = async (data: string) => {
    if (machine === undefined) {
      dispatch(
        setModal(
          <PromptModal
            {...{ type: "error", title: "Error", message: "Please setup machine" }}
          ></PromptModal>
        )
      );
      return;
    }
    try {
      await createQrCodeMutation({
        createQrCodeDto: { code: data, machine: machine },
      });
    } catch (error) {
      console.error("Error sending rfid data:", error);
    }
  }


  const [rfidService] = useState(
    () => new SerialPortService("rfid", sendRfidData, true)
  );


  const [scannerService] = useState(
    () => new SerialPortService("scanner", sendScannerData, false)
  );

  useEffect(() => {
    rfidService.openPort();
  }, [rfidSettings, rfidService]);


  useEffect(() => {
    scannerService.openPort();
  }, [scannerSetting, scannerService]);


  useEffect(() => {
    dispatch(SetSidebarActiveIndex(pathName));
  }, [pathName, dispatch]);

  if (isError) {
    router.push("/login");
    return null;
  }

  if (isSuccess) {
    return (
      <App className="flex h-full min-w-full min-h-screen bg-gray-300">
        <Modal />
        <SideBar />
        <div className="flex flex-col w-full pl-56 pr-4">
          <TopBar />
          <div className="flex flex-wrap w-full">{children}</div>
        </div>
      </App>
    );
  }

  return null;
}
