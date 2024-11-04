import React, { useEffect, useState } from 'react';
import {
  calMonth,
  calYear,
  calYearMonth,
  checkAdminSession,
  getCars,
  getDrivingInform,
  getNotification,
} from '../../api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ICars, IDrivingInform } from '../../interfaces/interface';
import Title from '../../components/Title';
import { useNavigate } from 'react-router-dom';
import { SlRefresh } from 'react-icons/sl';
import Page from '../../components/Page';
import { useMediaQuery } from 'react-responsive';
import ArrowBack from './../../components/ArrowBack';
import Logout from '../auth/Logout';
import { Pencil, Settings, Users } from 'lucide-react';
import DriveMobile from './DriveMobile';
import DrivePC from './DrivePC';
import { ROUTES } from '../../constants/constant';
import { Alert } from '@mui/material';
import AddDriveNotification from './AddDriveNotification';

function DriveMain() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 540px)' });

  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [carId, setCarId] = useState('');
  const [car, setCar] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const { data: drivingInform, refetch } = useQuery<IDrivingInform[]>({
    queryKey: ['drivingInform'],
    queryFn: () =>
      getDrivingInform(
        calYear(currentDate || new Date()),
        calMonth(currentDate || new Date()),
        carId
      ),
    refetchInterval: 300_000,
    enabled: carId.length > 0,
  });

  const { data: notification, refetch: refetchNotification } = useQuery<ICars>({
    queryKey: ['notification', carId],
    queryFn: () => getNotification(carId),
    enabled: carId.length > 0,
  });

  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isMobile ? 10 : 25;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = drivingInform
    ? Math.ceil(drivingInform.length / itemsPerPage)
    : 0;

  useEffect(() => {
    refetch();
  }, [carId, refetch, currentDate]);

  const [showInput, setShowInput] = useState(false);

  const { data: cars } = useQuery<ICars[]>({
    queryKey: ['car', 1],
    queryFn: getCars,
  });

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const onChangeCarNum = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const carId = e.target.value.split(',')[0];
    const carName = e.target.value.split(',')[1];
    setCar(carName);
    setCarId(carId);
    setCurrentPage(1);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // 'YYYY-MM' 형식으로 입력이 들어오므로, 이를 기반으로 currentDate를 설정
    const [year, month] = inputValue.split('-');
    if (month && year) {
      // 한자리 수 월을 두 자리로 변환
      const formattedMonth = month.padStart(2, '0');
      setCurrentDate(new Date(`${year}-${formattedMonth}-01`));
    }

    setCurrentPage(1);
  };

  const onClickInputInform = () => {
    navigate(ROUTES.DRIVING_INPUT);
  };

  const onClickAdmin = async () => {
    const status = await checkAdminSession();
    if (status === 200) {
      navigate(ROUTES.ADMIN);
    }
  };

  const totalFuelCost =
    drivingInform?.reduce((acc, item) => acc + item.fuelCost, 0) || 0;
  const totalToll =
    drivingInform?.reduce((acc, item) => acc + item.toll, 0) || 0;
  const totalEtcCost =
    drivingInform?.reduce((acc, item) => acc + item.etc.cost, 0) || 0;
  const totalDrivingKM =
    drivingInform?.reduce((acc, item) => acc + item.totalKM, 0) || 0;
  const grandTotal = totalFuelCost + totalToll + totalEtcCost;

  return (
    <div className="flex flex-col items-center justify-between w-full min-h-screen p-4 sm:p-2 bg-gradient-to-br from-zinc-50 to-slate-100">
      <div className="sm:w-full w-[80%] flex flex-col items-center ">
        <div className="flex items-center justify-between w-full mt-4 mb-4 print:justify-center sm:mt-4">
          <ArrowBack type="home" />
          <Title
            currentDate={currentDate || new Date()} // currentDate가 null일 경우 새 Date 객체 사용
            setCurrentDate={setCurrentDate} // 여기는 null을 허용하므로 변경 없음
            setShowInput={setShowInput}
            calYearMonth={calYearMonth}
            category="driving"
          />
          <Logout />
        </div>

        <div className="flex items-center justify-between w-full mb-2">
          {showInput && (
            <div className="flex justify-center w-full hover:opacity-60">
              <input
                type="month"
                onChange={handleDateChange}
                onBlur={() => setShowInput(false)}
                className="sm:w-[70%] w-[33%] my-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              />
            </div>
          )}
        </div>

        <div className="w-full">
          <div className="hidden w-full mb-4 font-bold print:flex">
            <span>{car}</span>
          </div>
          <div className="w-[100%] flex justify-between items-center border border-t-gray-300 rounded-t-2xl md:h-16 print-hidden">
            <div className="flex w-[50%] items-center justify-between">
              <select
                className="md:w-[20%] sm:w-[40%] hover:opacity-60 font-bold h-10 border border-gray-300 rounded-lg p-2 text-sm mx-4"
                onChange={onChangeCarNum}
                defaultValue=""
              >
                <option value="" disabled>
                  차량 선택
                </option>
                {cars &&
                  cars
                    .sort((a, b) => a.car.localeCompare(b.car))
                    .map((car) => (
                      <option key={car._id} value={`${car._id},${car.car}`}>
                        {car.car}
                      </option>
                    ))}
              </select>
              {carId.length > 0 && !isMobile && (
                <Alert
                  onClick={() => setIsAdding(true)}
                  severity="info"
                  variant="outlined"
                  className="md:w-[80%] flex items-center h-10 p-2 ml-8 cursor-pointer hover:opacity-60"
                  sx={{
                    fontSize: 'medium',
                    height: '14',
                    bgColor: '#93C5FD',
                    borderRadius: '8px',
                    border: '1px solid lightgray',
                    fontWeight: 'bold',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  {notification?.notification || '공지사항을 등록해주세요'}
                </Alert>
              )}
            </div>

            {isAdding && (
              <AddDriveNotification
                setIsAdding={setIsAdding}
                id={carId}
                queryClient={queryClient}
                notice={notification?.notification || ''}
              />
            )}

            <div className="p-4 items-center flex flex-1 overflow-hidden w-[50%] justify-end">
              <div className="flex items-center justify-center sm:flex-col">
                <button
                  onClick={() => navigate(ROUTES.EMPLOYEE_STATUS)}
                  className="whitespace-nowrap bg-[#0EA5E9] rounded-lg
                   text-white md:py-2 sm:py-1 sm:text-sm px-4 hover:opacity-60
                    md:mr-4 sm:mb-2 button-effect flex justify-center items-center"
                >
                  <Users className="sm:w-4 sm:h-4" />
                  <span className="ml-1 sm:text-xs">근무</span>
                </button>
                <button
                  className="whitespace-nowrap bg-[#10B981] rounded-lg 
                  text-white md:py-2 sm:py-1 sm:text-sm px-4 button-effect 
                  md:mr-4 sm:mb-2 flex justify-center items-center"
                  onClick={onClickInputInform}
                >
                  <Pencil className="sm:w-4 sm:h-4" />
                  <span className="ml-1 sm:text-xs">입력</span>
                </button>
                <button
                  className="whitespace-nowrap bg-[#0EA5E9] rounded-lg text-white md:py-2 sm:py-1 sm:text-sm px-4 hover:opacity-60 button-effect flex justify-center items-center"
                  onClick={onClickAdmin}
                >
                  <Settings className="sm:w-4 sm:h-4" />
                  <span className="ml-1 sm:text-xs">관리</span>
                </button>
              </div>

              <div className="mx-4 border border-gray-300 md:h-10 sm:h-12" />
              <button className="" onClick={() => refetch()}>
                <SlRefresh className="md:w-7 md:h-7 sm:w-6 sm:h-6 hover:opacity-60" />
              </button>
            </div>
          </div>
          {isMobile ? (
            <DriveMobile
              drivingInform={drivingInform || []}
              grandTotal={grandTotal}
              totalDrivingKM={totalDrivingKM}
              totalEtcCost={totalEtcCost}
              totalFuelCost={totalFuelCost}
              totalToll={totalToll}
              indexOfFirstItem={indexOfFirstItem}
              indexOfLastItem={indexOfLastItem}
            />
          ) : (
            <DrivePC
              drivingInform={drivingInform || []}
              totalDrivingKM={totalDrivingKM}
              totalEtcCost={totalEtcCost}
              totalFuelCost={totalFuelCost}
              totalToll={totalToll}
              grandTotal={grandTotal}
              indexOfFirstItem={indexOfFirstItem}
              indexOfLastItem={indexOfLastItem}
              refetch={refetch}
            />
          )}
        </div>
      </div>
      <Page
        totalPage={totalPages}
        page={currentPage}
        onPageChange={handleClick}
      />
    </div>
  );
}

export default DriveMain;
