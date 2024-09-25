import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { calDate, getInform } from "../api";
import AdminLogin from "../components/AdminLogin";
import { SlRefresh } from "react-icons/sl";

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
    queryFn: () => getInform(currentDate),
    refetchInterval: 300000, // 5분마다 refetch
  });

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

  const [isShow, setIsShow] = useState(false);

  const previous = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate);
    setCurrentPage(1);
  };

  const next = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate);
    setCurrentPage(1);
  };

  useEffect(() => {
    refetch();
  }, [currentDate, refetch]);

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center sm:p-2 p-10 bg-gray-50">
      {isShow && <AdminLogin setIsShow={setIsShow} />}
      <div className="sm:w-full w-[80%] flex flex-col items-center ">
        <div className="mt-4 mb-24 flex items-center justify-center w-[100%] ">
          <IoIosArrowBack
            className="w-8 h-9 hover:opacity-60"
            onClick={previous}
          />

          <span className="font-bold sm:text-lg text-3xl mx-8 ">
            {calDate(currentDate)}
          </span>
          <IoIosArrowForward
            className="w-8 h-9 hover:opacity-60"
            onClick={next}
          />
        </div>
        <div className="w-[100%] flex justify-between items-center border border-t-gray-300 rounded-t-2xl">
          <span className="sm:text-lg text-xl w-[50%] font-bold ml-3">
            현황
          </span>
          <div className="p-4 items-center flex w-[50%] justify-end">
            <button
              className="sm:whitespace-nowrap bg-[#00ab39] rounded-lg text-white py-2 px-4 hover:opacity-60 mr-4 sm:mr-2"
              onClick={onClickInputInform}
            >
              입력
            </button>
            <button
              className="sm:whitespace-nowrap bg-[#007BFF] rounded-lg text-white py-2 px-4 hover:opacity-60 ml-4 sm:ml-2"
              onClick={onClickAdmin}
            >
              관리
            </button>
            <div className="h-10 border border-gray-300 mx-4" />
            <button className="hover:opacity-60" onClick={() => refetch()}>
              <SlRefresh className="w-7 h-7" />
            </button>
          </div>
        </div>
        <table className="w-[100%] rounded-2xl shadow-lg text-left table-auto">
          <thead className="w-[100%]">
            <tr className="bg-gray-200 sm:text-xs">
              <th className="p-4 border-b border-gray-300 sm:whitespace-nowrap">
                이름
              </th>
              <th className="p-4 border-b border-gray-300 sm:whitespace-nowrap">
                방문지
              </th>
              <th className="p-4 border-b border-gray-300 sm:whitespace-nowrap">
                사업명
              </th>
              <th className="p-4 border-b border-gray-300 sm:whitespace-nowrap">
                업무
              </th>
              <th className="p-4 border-b border-gray-300 sm:whitespace-nowrap">
                차량
              </th>
            </tr>
          </thead>

          <tbody className="rounded-b-xl">
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
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`mx-1 px-3 py-1 rounded hover:opacity-60 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Main;
