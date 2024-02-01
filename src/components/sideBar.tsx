"use client";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Card, Text, Divider } from "@tremor/react";
import { HiChartBar } from "react-icons/hi";
import { menuItems, SetSidebarActiveIndex } from "@/redux/UI/sideBarSlice";

const SideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeIndex } = useAppSelector((state) => state.sidebarReducer);

  return (
    <div className="fixed w-56 h-screen p-4">
      <Card className="flex flex-col w-full h-full bg-gray-800 shadow-2xl rounded-3xl">
        <div className="flex flex-row items-center">
          <HiChartBar className="mr-3 text-4xl text-blue-400 " />
          <Text className="text-lg font-semibold text-white text-md">
            ZF System
          </Text>
        </div>
        <Divider />
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={`flex flex-row items-center h-12 mb-3 text-md rounded-xl 
            hover:${index === activeIndex ? "" : "bg-gray-500"}
            ${index === activeIndex ? "bg-blue-400" : ""}`}
          >
            <item.icon className="ml-3 mr-5 text-2xl" />
            <Text className="text-lg font-semibold text-white">
              {item.label}
            </Text>
          </Link>
        ))}
      </Card>
    </div>
  );
};

export default SideBar;
