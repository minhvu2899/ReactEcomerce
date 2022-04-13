import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import Title from "./Title";

export default function ReportByProduct({ data, date_start, date_end }) {
  return (
    <React.Fragment>
      {/* <Title>
        Thống kê bán hàng theo sản phẩm từ ngày {date_start} đến ngày {date_end}
      </Title> */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Mã sản phẩm</TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Số lượng bán</TableCell>

            <TableCell align="right">Doanh thu</TableCell>
            <TableCell align="right">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.length > 0 &&
            data.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.products && row.products[0]}</TableCell>
                <TableCell>{row.numQuantity}</TableCell>
                {/* <TableCell align="right">
                {formatPrice(row.total_income)}
              </TableCell> */}
                <TableCell>
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
