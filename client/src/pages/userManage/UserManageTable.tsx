import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Users } from "../../interfaces/interface";
import { axiosReq } from "../../api";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";

interface ITableProps {
  users: Users[];
  refetch: () => void;
}
function UserManageTable({ users, refetch }: ITableProps) {
  const deleteUser = async (id: string) => {
    if (!window.confirm("삭제하시겠습니까?")) {
      return;
    }

    const response = await axiosReq.delete(`/api/users/${id}`);

    if (response.status === 200) {
      refetch();
    }
  };

  const approveUser = async (id: string) => {
    if (!window.confirm("승인하시겠습니까?")) {
      return;
    }
    const response = await axiosReq.patch(`/api/users/${id}/approve`);

    if (response.status === 200) {
      refetch();
    }
  };

  const rejectUser = async (id: string) => {
    if (!window.confirm("거절하시겠습니까?")) {
      return;
    }
    const response = await axiosReq.patch(`/api/users/${id}/reject`);

    if (response.status === 200) {
      refetch();
    }
  };
  return (
    <TableContainer
      sx={{ width: "85%", marginTop: 4 }}
      component={Paper}
      className="rounded-xl shadow-lg"
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow className="bg-blue-50">
            <TableCell
              className="bg-blue-50 font-semibold text-gray-700"
              sx={{
                fontSize: "0.9rem",
                fontWeight: "bold",
                py: 2,
                "&:first-of-type": {
                  paddingLeft: 2,
                },
                whiteSpace: "nowrap",
              }}
            >
              아이디
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user, index) => (
            <TableRow key={index}>
              <TableCell sx={{ fontSize: "medium" }}>{user.userId}</TableCell>
              <TableCell>
                {user.isApproved ? (
                  <div>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="rounded-full p-2 transition-colors hover:bg-gray-100"
                    >
                      <Trash2 className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => approveUser(user._id)}
                      className="rounded-full bg-green-100 p-2 transition-colors hover:bg-green-200"
                    >
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </button>
                    <button
                      onClick={() => rejectUser(user._id)}
                      className="ml-2 rounded-full bg-red-100 p-2 transition-colors hover:bg-red-200"
                    >
                      <XCircle className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserManageTable;
