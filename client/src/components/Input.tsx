import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  formDate,
  getBusinesses,
  getCars,
  getDestinations,
  getNames,
  getStates,
} from "../api";
import {
  IBusinesses,
  ICars,
  IDestinations,
  INames,
  IStates,
} from "../interfaces/interface";
import axiosApi from "../axios";
import { useNavigate } from "react-router-dom";

function Input() {
  const [username, setName] = useState("");
  const [destination1, setDestination1] = useState("");
  const [destination2, setDestination2] = useState("");
  const [destination3, setDestination3] = useState("");
  const [business, setBusiness] = useState("");
  const [state, setState] = useState("");
  const [car, setCar] = useState("");

  const navigate = useNavigate();

  const { data: names, isLoading: namesLoading } = useQuery<INames[]>({
    queryKey: ["names"],
    queryFn: getNames,
  });
  const { data: destinations, isLoading: destinationsLoading } = useQuery<
    IDestinations[]
  >({
    queryKey: ["destinations"],
    queryFn: getDestinations,
  });

  const { data: businesses, isLoading: businessesLoading } = useQuery<
    IBusinesses[]
  >({
    queryKey: ["businesses"],
    queryFn: getBusinesses,
  });

  const { data: states, isLoading: statesLoading } = useQuery<IStates[]>({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const { data: cars, isLoading: carsLoading } = useQuery<ICars[]>({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setName(event.target.value);
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

  const handleBusinessChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBusiness(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
  };

  const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCar(event.target.value);
  };

  if (
    namesLoading ||
    destinationsLoading ||
    businessesLoading ||
    statesLoading ||
    carsLoading
  ) {
    return <div>Loading...</div>;
  }

  const onClickComplete = async () => {
    if (!username) {
      alert("이름을 선택해주세요");
      return;
    }

    const selectedDestinations = [
      destination1,
      destination2,
      destination3,
    ].filter(Boolean);

    if (selectedDestinations.length === 0) {
      alert("방문지를 선택해주세요");
      return;
    }

    if (!business) {
      alert("사업명을 선택해주세요");
      return;
    }

    if (!state) {
      alert("업무를 선택해주세요");
      return;
    }

    if (!car) {
      alert("차량을 선택해주세요");
      return;
    }

    try {
      const requests = selectedDestinations.map((destination) =>
        axiosApi.post("/addInform", {
          username,
          destination,
          business,
          state,
          car,
        })
      );

      const responses = await Promise.all(requests);

      if (responses.every((res) => res.status === 200)) {
        alert("입력이 완료되었습니다.");
        navigate("/");
      }
    } catch (error) {
      alert("정보 입력 중 오류가 발생하였습니다.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center p-10 bg-gray-50">
      <div className="w-[80%] flex flex-col items-center  rounded-lg">
        <div className="mt-4 mb-20 flex items-center justify-center w-full">
          <span className="mb-4 font-bold text-3xl">{formDate}</span>
        </div>

        <table className="w-full text-left border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 border-b border-gray-300">이름</th>
              <th className="p-4 border-b border-gray-300">방문지</th>
              <th className="p-4 border-b border-gray-300">사업명</th>
              <th className="p-4 border-b border-gray-300">업무</th>
              <th className="p-4 border-b border-gray-300">차량</th>
              <th className="p-4 border-b border-gray-300"></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              {/* 이름 */}
              <td>
                <select
                  defaultValue=""
                  onChange={handleNameChange}
                  className="hover:opacity-60 border rounded-md p-2 ml-3"
                >
                  <option disabled value="">
                    이름 선택
                  </option>
                  {names
                    ?.sort((a, b) => a.username.localeCompare(b.username))
                    .map((item, index) => (
                      <option key={index} value={item.username}>
                        {item.username}
                      </option>
                    ))}
                </select>
              </td>

              {/* 방문지 */}
              <td className="flex flex-col">
                {[
                  handleDestinationChange1,
                  handleDestinationChange2,
                  handleDestinationChange3,
                ].map((handler, index) => (
                  <select
                    key={index}
                    defaultValue=""
                    onChange={handler}
                    className="hover:opacity-60 border rounded-md p-2 my-4 ml-2"
                  >
                    <option disabled value="">
                      방문지 선택
                    </option>
                    {destinations
                      ?.sort((a, b) =>
                        a.destination.localeCompare(b.destination)
                      )
                      .map((item, idx) => (
                        <option key={idx} value={item.destination}>
                          {item.destination}
                        </option>
                      ))}
                  </select>
                ))}
              </td>

              {/* 사업명 */}
              <td>
                <select
                  defaultValue=""
                  onChange={handleBusinessChange}
                  className="hover:opacity-60 border rounded-md p-2 ml-4"
                >
                  <option disabled value="">
                    선택
                  </option>
                  {businesses
                    ?.sort((a, b) => a.business.localeCompare(b.business))
                    .map((item, index) => (
                      <option key={index} value={item.business}>
                        {item.business}
                      </option>
                    ))}
                </select>
              </td>

              {/* 업무 */}
              <td>
                <select
                  defaultValue=""
                  onChange={handleStateChange}
                  className="hover:opacity-60 border rounded-md p-2"
                >
                  <option disabled value="">
                    선택
                  </option>
                  {states
                    ?.sort((a, b) => a.state.localeCompare(b.state))
                    .map((item, index) => (
                      <option key={index} value={item.state}>
                        {item.state}
                      </option>
                    ))}
                </select>
              </td>

              {/* 차량 */}
              <td>
                <select
                  defaultValue=""
                  onChange={handleCarChange}
                  className="hover:opacity-60 border rounded-md p-2"
                >
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
