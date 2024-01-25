"use client";
import { Inter } from "next/font/google";
import SideBar from "@/components/sideBar";
import { TopBar } from "@/components/topBar";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Modal from "@/components/modal";
import { useEffect } from "react";
import { useAuthControllerMeQuery } from "@/redux/services/api";
import { SetSiebarActiveIndex } from "@/redux/UI/sideBarSlice";

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

  console.log("reload");
  
  useEffect(() => {
    dispatch(SetSiebarActiveIndex(pathName));
  }, [pathName,dispatch]);

  if (isError) {
    return router.push("/login");
  }

  if (isSuccess) {
    return (
      <div className="flex h-full min-w-full min-h-screen bg-gray-300">
        <Modal></Modal>
        <SideBar></SideBar>
        <div className="flex flex-col w-full pl-56 pr-4">
          <TopBar></TopBar>
          <div className="flex flex-wrap w-full">{children}</div>
        </div>
      </div>
    );
  }
}
