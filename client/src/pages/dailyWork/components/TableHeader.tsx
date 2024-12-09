import { TableCell, TableHead, TableRow } from "@mui/material";
import { dailyWorkHeaders } from "../../../constants/headers";

function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        {dailyWorkHeaders.map((header, index) => (
          <TableCell
            align="center"
            sx={{
              fontWeight: "600",
              whiteSpace: "nowrap",
              fontSize: "large",
            }}
            key={index}
          >
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
