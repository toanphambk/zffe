"use client";
import { Inter } from "next/font/google";
import SideBar from "@/components/sideBar";
import { TopBar } from "@/components/topBar";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Modal from "@/components/modal";
import { useEffect, useMemo, useRef, useState } from "react"; // Import useMemo
import { useAuthControllerMeQuery } from "@/redux/services/api";
import { SetSidebarActiveIndex } from "@/redux/UI/sideBarSlice";
import { SerialPortService } from "@/service/serialPortService";
import { store } from "@/redux/store";
import { AppDispatch } from "../../redux/store";

const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isError, isSuccess } = useAuthControllerMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  const rfidSettings = useAppSelector(
    (state) => state.portsSettingReducer.rfid
  );

  const [rfidService] = useState(
    () => new SerialPortService("rfid", store, dispatch)
  );

  useEffect(() => {
    rfidService.openPort();

    return () => {
      rfidService.closePort(); // Ensure this method exists and properly cleans up
    };
  }, [rfidSettings, rfidService]);

  useEffect(() => {
    dispatch(SetSidebarActiveIndex(pathName));
  }, [pathName, dispatch]);

  if (isError) {
    router.push("/login");
    return null; // Make sure to return null or a loading indicator while the navigation is in progress
  }

  if (isSuccess) {
    return (
      <div className="flex h-full min-w-full min-h-screen bg-gray-300">
        <Modal />
        <SideBar />
        <div className="flex flex-col w-full pl-56 pr-4">
          <TopBar />
          <div className="flex flex-wrap w-full">{children}</div>
        </div>
      </div>
    );
  }

  return null;
}
