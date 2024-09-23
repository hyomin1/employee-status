import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCars, getDestinations, getNames, getStates } from "../api";
import { ICars, IDestinations, INames, IStates } from "../interfaces/interface";
import axiosApi from "../axios";

function Input() {
  const today = new Date();
  const formatDate = today.toLocaleDateString("ko-KR");

  const [username, setName] = useState("");
  const [car, setCar] = useState("");
  const [destination1, setDestination1] = useState("");
  const [destination2, setDestination2] = useState("");
  const [destination3, setDestination3] = useState("");
  const [state, setState] = useState("");

  const {
    data: names,
    isLoading: namesLoading,
    error: namesError,
  } = useQuery<INames[]>({
    queryKey: ["names"],
    queryFn: getNames,
  });
  const {
    data: destinations,
    isLoading: destinationsLoading,
    error: destinationsError,
  } = useQuery<IDestinations[]>({
    queryKey: ["destinations"],
    queryFn: getDestinations,
  });

  const {
    data: states,
    isLoading: statesLoading,
    error: statesError,
  } = useQuery<IStates[]>({ queryKey: ["states"], queryFn: getStates });

  const {
    data: cars,
    isLoading: carsLoading,
    error: carsError,
  } = useQuery<ICars[]>({ queryKey: ["cars"], queryFn: getCars });

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setName(event.target.value);
  };
  const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCar(event.target.value);
  };
  const handleDestinationChange1 = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDestination1(event.target.value);
  };
  const handleDestinationChange2 = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDestination2(event.target.value);
  };
  const handleDestinationChange3 = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDestination3(event.target.value);
  };
  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
  };
  if (namesLoading || destinationsLoading || statesLoading || carsLoading) {
    return <div>Loading...</div>;
  }
  const onClickComplete = async () => {
    if (!username) {
      alert("이름을 선택해주세요");
      return;
    }
    if (!destination1) {
      alert("행선지를 선택해주세요");
      return;
    }
    if (!state) {
      alert("상태를 선택해주세요");
      return;
    }
    if (!car) {
      alert("차량을 선택해주세요");
      return;
    }
    const res = await axiosApi.post("/addInform", {
      username,
      destination: destination1,
      state,
      car,
    });
    //데이터 넣고 홈으로 보내기
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center p-10">
      <div className="w-[80%] flex flex-col items-center">
        <div className="mb-4 flex items-center justify-center w-[100%]">
          <span className="mb-4 font-bold text-3xl">{formatDate}</span>
        </div>

        <table className="w-[100%] rounded-2xl shadow-lg text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 border-b border-gray-300">이름</th>
              <th className="p-4 border-b border-gray-300">행선지</th>
              <th className="p-4 border-b border-gray-300">상태</th>
              <th className="p-4 border-b border-gray-300">차량</th>
              <th className="p-4 border-b border-gray-300">확인</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              {/* 이름 */}
              <td>
                <select defaultValue="" onChange={handleNameChange}>
                  <option disabled value="">
                    이름 선택
                  </option>
                  {names?.map((item, index) => (
                    <option key={index} value={item.username}>
                      {item.username}
                    </option>
                  ))}
                </select>
              </td>
              {/* 행선지 */}
              <td className="flex flex-col">
                <select defaultValue="" onChange={handleDestinationChange1}>
                  <option disabled value="">
                    행선지 선택
                  </option>
                  {destinations?.map((item, index) => (
                    <option key={index} value={item.destination}>
                      {item.destination}
                    </option>
                  ))}
                </select>

                <select defaultValue="" onChange={handleDestinationChange2}>
                  <option disabled value="">
                    행선지 선택
                  </option>
                  {destinations?.map((item, index) => (
                    <option key={index} value={item.destination}>
                      {item.destination}
                    </option>
                  ))}
                </select>

                <select defaultValue="" onChange={handleDestinationChange3}>
                  <option disabled value="">
                    행선지 선택
                  </option>
                  {destinations?.map((item, index) => (
                    <option key={index} value={item.destination}>
                      {item.destination}
                    </option>
                  ))}
                </select>
              </td>
              {/* 상태 */}
              <td>
                <select defaultValue="" onChange={handleStateChange}>
                  <option disabled value="">
                    선택
                  </option>
                  {states?.map((item, index) => (
                    <option key={index} value={item.state}>
                      {item.state}
                    </option>
                  ))}
                </select>
              </td>

              {/* 차량 */}
              <td>
                <select defaultValue="" onChange={handleCarChange}>
                  <option disabled value="">
                    차량 선택
                  </option>
                  {cars?.map((item, index) => (
                    <option key={index} value={item.car}>
                      {item.car}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <button
                  onClick={onClickComplete}
                  className="bg-[#00ab39] rounded-lg text-white py-2 px-4 hover:opacity-60"
                >
                  완료
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Input;
