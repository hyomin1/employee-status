import { useEffect, useState } from "react";
import { calculateDate, checkAdminSession, getUsers } from "../../api";
import ArrowBack from "../../components/common/ArrowBack";
import Blank from "../../components/common/Blank";
import UserManageTab from "./UserManageTab";
import { useQuery } from "@tanstack/react-query";
import { Users } from "../../interfaces/interface";
import UserManageTable from "./UserManageTable";

function UserManagePage() {
  const [value, setValue] = useState(0);
  // value 0 -> 승인 value 1 -> 승인 x
  const filterUsersByApprovalStatus = (data: Users[], value: number) =>
    data.filter((user) => {
      const isRolePositive = user.role > 0;
      const shouldIncludePositive = value === 0;
      return isRolePositive === shouldIncludePositive;
    });

  const { data: users, refetch } = useQuery<Users[]>({
    queryKey: ["users", value],
    queryFn: getUsers,
    select: (data) => filterUsersByApprovalStatus(data, value),
  });

  useEffect(() => {
    checkAdminSession();
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center bg-gradient-to-br from-gray-50 to-zinc-100 p-10 sm:p-2">
      <div className="flex w-[90%] flex-col items-center sm:w-full">
        <div className="mb-8 mt-2 flex w-full items-center justify-between sm:mt-4">
          <ArrowBack type="not home" />
          <span className="whitespace-nowrap font-bold sm:mx-1 sm:text-sm md:mx-8 md:text-3xl">
            {calculateDate(new Date())}
          </span>
          <Blank />
        </div>
      </div>

      <UserManageTab value={value} setValue={setValue} />

      <UserManageTable users={users || []} refetch={refetch} value={value} />
    </div>
  );
}

export default UserManagePage;
