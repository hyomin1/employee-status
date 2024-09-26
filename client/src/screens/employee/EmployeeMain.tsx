import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { calDate, getEmployeeInform } from "../../api";
import AdminLogin from "../../components/AdminLogin";
import { SlRefresh } from "react-icons/sl";
import TabHeader from "../../components/TabHeader";
import Page from "../../components/Page";
import { employeeHeaders } from "../../constants/headers";

interface IInform {
  username: string;
  destination: string;
  business: string;
  work: string;
  car: string;
  createdAt: Date;
}
function Main() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data: inform, refetch } = useQuery<IInform[]>({
    queryKey: ["inform"],
    queryFn: () => getEmployeeInform(currentDate),
    refetchInterval: 300000, // 5분마다 refetch
  });

  const [isShow, setIsShow] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = inform ? Math.ceil(inform.length / itemsPerPage) : 0;

  const navigate = useNavigate();

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const onClickInputInform = () => {
    navigate("/input");
  };

  const onClickAdmin = () => {
    setIsShow(true);
  };

  const previous = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate);
    setCurrentPage(1);
    setShowInput(false);
  };

  const selectDate = () => {
    setShowInput((prev) => !prev);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(new Date(e.target.value));
    setShowInput(false);
    setCurrentPage(1);
  };

  const next = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate);
    setCurrentPage(1);
    setShowInput(false);
  };

  useEffect(() => {
    refetch();
  }, [currentDate, refetch]);

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center sm:p-2 p-10 bg-gray-50">
      {isShow && <AdminLogin setIsShow={setIsShow} />}
      <div className="sm:w-full w-[80%] flex flex-col items-center ">
        <div className="mt-4 mb-24 flex items-center justify-center w-[100%] ">
          <button onClick={previous} className="hover:opacity-60">
            <IoIosArrowBack className="w-8 h-9" />
          </button>
          <button>
            <span
              onClick={selectDate}
              className="font-bold sm:text-xl text-3xl mx-8 hover:opacity-70"
            >
              {calDate(currentDate)}
            </span>
          </button>

          <button onClick={next} className="hover:opacity-60">
            <IoIosArrowForward className="w-8 h-9" />
          </button>
        </div>

        {showInput && (
          <div className="w-[100%] flex justify-center">
            <input
              type="date"
              value={currentDate.toISOString().split("T")[0] || ""}
              className="sm:w-full w-[60%] my-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              onChange={handleDateChange}
            />
          </div>
        )}

        <div className="w-[100%] flex justify-between items-center border border-t-gray-300 rounded-t-2xl">
          <span className="sm:text-lg text-xl w-[50%] font-bold ml-3">
            현황
          </span>
          <div className="p-4 items-center flex w-[50%] justify-end">
            <button
              className="sm:whitespace-nowrap bg-[#00ab39] rounded-lg text-white py-2 px-4 button-effect mr-4 sm:mr-2"
              onClick={onClickInputInform}
            >
              입력
            </button>
            <button
              className="sm:whitespace-nowrap bg-[#007BFF] rounded-lg text-white py-2 px-4 hover:opacity-60 ml-4 sm:ml-2 button-effect"
              onClick={onClickAdmin}
            >
              관리
            </button>
            <div className="h-10 border border-gray-300 mx-4" />
            <button className="" onClick={() => refetch()}>
              <SlRefresh className="w-7 h-7 hover:opacity-60" />
            </button>
          </div>
        </div>
        <table className="w-[100%] rounded-2xl shadow-lg text-left table-auto overflow-y-auto">
          <TabHeader headers={employeeHeaders} />

          <tbody className="rounded-b-xl ">
            {inform
              ?.sort((a, b) => {
                if (a.destination === b.destination) {
                  return a.username.localeCompare(b.username); // username으로 정렬
                }
                return a.destination.localeCompare(b.destination); //destination으로 정렬
              })
              .slice(indexOfFirstItem, indexOfLastItem)

              .map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-100 sm:text-sm ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-4 border-b border-gray-200 whitespace-nowrap">
                    {item.username}
                  </td>
                  <td className="p-4 border-b border-gray-200 ">
                    {item.destination}
                  </td>
                  <td className="p-4 border-b border-gray-200 ">
                    {item.business}
                  </td>
                  <td className="p-4 border-b border-gray-200 ">{item.work}</td>
                  <td className="p-4 border-b border-gray-200">{item.car}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <Page
        totalPage={totalPages}
        page={currentPage}
        onPageChange={handleClick}
      />
    </div>
  );
}

export default Main;
