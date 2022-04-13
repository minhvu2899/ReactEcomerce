import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "utils";
import Title from "./Title";

export default function ReportByCustomer({
  data,
  date_start,
  date_end,
  type,
  value,
}) {
  const history = useNavigate();

  const handleClick = (id) => {
    // history.push({
    //   pathname: `/admin/statistics/customer/${id}`,
    //   state: { date_start, date_end, type, value },
    // });
  };
  // console.log(date_start, date_end);
  return (
    <React.Fragment>
      {/* <Title>
        Thống kê bán hàng theo khách hàng từ ngày {date_start} đến ngày{" "}
        {date_end}
      </Title> */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Mã khách hàng</TableCell>
            <TableCell align="center">Số lượng</TableCell>

            <TableCell align="center">Doanh thu</TableCell>
            <TableCell align="right">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.length > 0 &&
            data.map((row) => (
              <TableRow key={row._id} align="center">
                <TableCell>{row._id}</TableCell>
                <TableCell align="center">{row.numQuantity}</TableCell>
                <TableCell align="center">
                  {formatPrice(row.sumIncome)}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleClick(row.user_id)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {/* <Button onClick={preventDefault}> Quay lại</Button> */}
    </React.Fragment>
  );
}
