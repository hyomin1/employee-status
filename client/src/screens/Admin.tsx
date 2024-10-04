import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { formDate } from "../api";
import Page from "../components/Page";
import TabHeaderAdmin from "../components/TabHeaderAdmin";
import TabContentAdmin from "../components/TabContentAdmin";
import { useAdminData } from "../hooks/useAdminData";
import ArrowBack from "../components/ArrowBack";

function Admin() {
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<string>("username");

  const [page, setPage] = useState(1);
  const { data, removeItem } = useAdminData(activeTab, page, queryClient);
  const [destination, setDestination] = useState("");

  const handleTabClick = (tab: string) => {
    setPage(1);
    setActiveTab(tab);
  };
  const handlePage = (page: number) => {
    setPage(page);
  };
  const filteredData = data.filter((item) => {
    if (activeTab === "business") {
      return item.destinationId === destination.split(",")[0].trim();
    }
    return true; // business 탭이 아니면 필터링 없이 모든 항목 반환
  });
  const itemsPerPage = 10;
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = paginatedData
    ? Math.ceil(filteredData.length / itemsPerPage)
    : 0;

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center sm:p-2 p-10">
      <div className="sm:w-full w-[80%] flex flex-col items-center h-screen">
        <div className="mt-4 mb-20 flex items-center md:justify-center w-full sm:mb-10 sm:justify-between">
          <div className="w-full flex justify-between items-center">
            <ArrowBack />
            <div className="sm:w-[80%] flex items-center justify-center">
              <span className=" font-bold text-3xl sm:text-xl">{formDate}</span>
            </div>
            <div className="w-[20%]" />
          </div>

          <div className="md-hidden sm:w-[10%]" />
        </div>

        <div className="w-[100%] ">
          <TabHeaderAdmin activeTab={activeTab} onTabClick={handleTabClick} />

          <TabContentAdmin
            activeTab={activeTab}
            data={paginatedData}
            removeItem={removeItem}
            queryClient={queryClient}
            destination={destination}
            setDestination={setDestination}
          />
        </div>
      </div>
      <Page totalPage={totalPages} page={page} onPageChange={handlePage} />
    </div>
  );
}

export default Admin;
