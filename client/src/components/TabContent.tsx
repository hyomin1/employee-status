import React, { useState } from "react";
import AddData from "./AddData";
import { FaPlus } from "react-icons/fa6";
import { TABS } from "../constants/adminTabs";
import { IoClose } from "react-icons/io5";
import { QueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";

interface TabContentProps {
  activeTab: string;
  data: any[];
  removeItem: (id: string) => void;
  queryClient: QueryClient;
}

const TabContent = ({
  activeTab,
  data,
  removeItem,
  queryClient,
}: TabContentProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const activeTabConfig = TABS.find((tab) => tab.key === activeTab);
  return (
    <div>
      {isAdding && (
        <AddData
          setIsAdding={setIsAdding}
          type={activeTab}
          queryClient={queryClient}
        />
      )}
      <div className="flex justify-between items-center border-b border-gray-200">
        <div className="bg-white p-4  font-bold text-xl whitespace-nowrap sm:text-lg">
          목록
        </div>

        <div className="mr-5">
          <button
            className="bg-[#00ab39] rounded-full text-white p-2 hover:opacity-60 font-bold"
            onClick={() => setIsAdding(true)}
          >
            <FaPlus className="w-5 h-5 sm:w-3 sm:h-3" />
          </button>
        </div>
      </div>
      {data.map((item, index) => (
        <div
          key={item._id}
          className={`flex justify-between items-center border-b border-gray-200 ${
            index % 2 === 0 ? "bg-white" : "bg-gray-50"
          }`}
        >
          <div className="p-4 border-b border-gray-200 whitespace-nowrap sm:text-lg overflow-ellipsis overflow-hidden">
            {item[activeTabConfig?.dataKey || ""]}
          </div>

          <div className="mr-4">
            <button
              className="bg-[] rounded-full  p-2 hover:opacity-60 font-bold"
              onClick={() => removeItem(item._id)}
            >
              <FaTrash className="w-7 h-7 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabContent;
