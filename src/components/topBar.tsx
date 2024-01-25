"use client";

import { Text, TextInput } from "@tremor/react";
import { HiBell, HiLogout, HiSearch } from "react-icons/hi";
import { useAppSelector } from "@/redux/hooks";
import { menuItems } from "@/redux/UI/sideBarSlice";
import Link from "next/link";

export const TopBar: React.FC = () => {
  const { activeIndex } = useAppSelector((state) => state.sidebarReducer);

  const { user } = useAppSelector((state) => state.authReducer);

  const currentPageName =
    activeIndex !== -1 ? menuItems[activeIndex].label : "Unknown Page";
  const currentItem = menuItems[activeIndex];

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
            {user?.role.name}/
          </Text>
          <Text className="font-bold text-black text-md">{user?.email}</Text>
        </div>
      </div>
      <div className="flex items-center mr-5">
        <TextInput icon={HiSearch} placeholder="Search..." />
        <HiBell className="ml-5 text-2xl text-blue-500 hover:cursor-pointer" />
        <Link href={"/login"}>
          <HiLogout className="ml-5 text-2xl text-blue-500 hover:cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
