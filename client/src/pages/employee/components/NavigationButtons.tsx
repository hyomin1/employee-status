import { Calendar, LineChart, Pencil, Settings, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../../constants/constant";
import { SlRefresh } from "react-icons/sl";
import { checkAdminSession } from "../../../api";

interface NavProps {
  refetch: () => void;
}

function NavigationButtons({ refetch }: NavProps) {
  const navigate = useNavigate();

  const handleAdminAction = async (category: string) => {
    const status = await checkAdminSession();
    if (status === 200) {
      navigate(`${ROUTES.ADMIN}/${category}`);
    }
  };
  return (
    <div className="flex w-[100%] items-center justify-between rounded-t-2xl border border-t-gray-300 bg-[#f8fafd]">
      <div className="w-full p-4 sm:p-3">
        <div className="flex items-center justify-between sm:flex-col">
          <div className="flex sm:mb-2 sm:w-full sm:gap-2">
            <button
              onClick={() => navigate(ROUTES.DRIVING_STATUS)}
              className="button-effect flex items-center justify-center whitespace-nowrap rounded-lg bg-[#0EA5E9] px-4 py-2 text-white hover:opacity-60 sm:mr-0 sm:flex-1 md:mr-4"
            >
              <Truck className="sm:h-4 sm:w-4" />
              <span className="ml-1 sm:text-xs">차량</span>
            </button>
            <button
              className="button-effect flex items-center justify-center whitespace-nowrap rounded-lg bg-[#10B981] px-4 py-2 text-white sm:mr-0 sm:flex-1 md:mr-4"
              onClick={() => navigate(ROUTES.EMPLOYEE_INPUT)}
            >
              <Pencil className="sm:h-4 sm:w-4" />
              <span className="ml-1 sm:text-xs">입력</span>
            </button>
            <button
              className="button-effect flex items-center justify-center whitespace-nowrap rounded-lg bg-[#0EA5E9] px-4 py-2 text-white sm:mr-0 sm:flex-1 md:mr-4"
              onClick={() => navigate(ROUTES.SCHEDULE)}
            >
              <Calendar className="sm:h-4 sm:w-4" />
              <span className="ml-1 sm:text-xs">일정</span>
            </button>
          </div>

          <div className="flex sm:w-full sm:gap-2">
            <button
              className="button-effect flex items-center justify-center whitespace-nowrap rounded-lg bg-[#0EA5E9] px-4 py-2 text-white hover:opacity-60 sm:mr-0 sm:flex-1 md:mr-4"
              onClick={() => handleAdminAction("settings")}
            >
              <Settings className="sm:h-4 sm:w-4" />
              <span className="ml-1 sm:text-xs">관리</span>
            </button>
            <button
              className="button-effect flex items-center justify-center whitespace-nowrap rounded-lg bg-[#10B981] px-4 py-2 text-white sm:mr-0 sm:flex-1 md:mr-4"
              onClick={() => handleAdminAction("statistics")}
            >
              <LineChart className="sm:h-4 sm:w-4" />
              <span className="ml-1 sm:text-xs">통계</span>
            </button>
            <div className="flex items-center sm:w-full sm:flex-1 sm:justify-center">
              <button onClick={() => refetch()}>
                <SlRefresh className="hover:opacity-60 sm:h-6 sm:w-6 md:h-7 md:w-7" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationButtons;
