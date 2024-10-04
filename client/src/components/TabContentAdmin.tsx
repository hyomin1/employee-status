import { useState } from "react";
import AddData from "./AddData";
import { FaPlus } from "react-icons/fa6";
import { TABS } from "../constants/adminTabs";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import { IDestinations } from "../interfaces/interface";
import { getDestinations } from "../api";

interface TabContentProps {
  activeTab: string;
  data: any[];
  removeItem: (id: string) => void;
  queryClient: QueryClient;
}

const TabContentAdmin = ({
  activeTab,
  data,
  removeItem,
  queryClient,
}: TabContentProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const activeTabConfig = TABS.find((tab) => tab.key === activeTab);

  const [destination, setDestination] = useState("");

  const { data: destinations, isLoading: destinationsLoading } = useQuery<
    IDestinations[]
  >({
    queryKey: ["destinations"],
    queryFn: getDestinations,
    enabled: activeTab === "business",
    select: (data) => (activeTab === "business" ? data : []),
  });
  const handleDestination = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDestination(e.target.value);
  };

  const handleAddData = () => {
    if (activeTab === "business" && destination === "") {
      alert("방문지를 선택해주세요.");
      return;
    }
    setIsAdding(true);
  };

  return (
    <div>
      {isAdding && (
        <AddData
          setIsAdding={setIsAdding}
          type={activeTab}
          queryClient={queryClient}
          destination={destination}
        />
      )}
      <div className="flex justify-between items-center border-b border-gray-200">
        <div className="bg-white p-4 font-bold text-xl whitespace-nowrap sm:text-lg">
          {activeTab === "business" ? (
            <select defaultValue="" onChange={handleDestination}>
              <option disabled value="">
                방문지 선택
              </option>
              {destinations
                ?.sort((a, b) => a.destination.localeCompare(b.destination))
                .map((item, index) => (
                  <option key={index} value={`${item._id},${item.destination}`}>
                    {item.destination}
                  </option>
                ))}
            </select>
          ) : (
            "목록"
          )}
        </div>

        <div className="mr-1">
          <button
            className="bg-[#00ab39] rounded-full text-white p-2 hover:opacity-60 font-bold"
            onClick={handleAddData}
          >
            <FaPlus className="w-5 h-5 sm:w-3 sm:h-3" />
          </button>
        </div>
      </div>
      {data
        .filter((item) => {
          if (activeTab === "business") {
            return item.destinationId === destination.split(",")[0].trim();
          }
          return true; // business 탭이 아니면 필터링 없이 모든 항목 반환
        })
        .sort((a, b) => {
          const aValue = a[activeTabConfig?.dataKey || ""];
          const bValue = b[activeTabConfig?.dataKey || ""];

          // 숫자 혹은 문자열 정렬 (문자열 비교시 localeCompare 사용)
          if (typeof aValue === "number" && typeof bValue === "number") {
            return aValue - bValue;
          } else if (typeof aValue === "string" && typeof bValue === "string") {
            return aValue.localeCompare(bValue);
          }
          return 0; // 기본값 (정렬 기준 없음)
        })
        .map((item, index) => (
          <div
            key={item._id}
            className={`flex justify-between items-center border-b border-gray-200 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <div className="p-4 border-b border-gray-200 whitespace-nowrap sm:text-lg overflow-ellipsis overflow-hidden">
              {activeTab === "business" && <span>{item.business}</span>}
              {activeTab !== "business" && (
                <span>{item[activeTabConfig?.dataKey || ""]}</span>
              )}
            </div>

            <div>
              <button
                className="bg-[] rounded-full p-2 hover:opacity-60 font-bold"
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

export default TabContentAdmin;
