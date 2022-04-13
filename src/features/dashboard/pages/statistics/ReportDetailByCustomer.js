import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { formatPrice, formatDateAndHour } from "utils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import { Button } from "@mui/material";

export default function ReportDetailByCustomer({ data, type, value }) {
  const history = useNavigate();
  function preventDefault(event) {
    history.push(`/admin/statistics?type=${type}&value=${value}`);
  }
  const handleClick = (id) => {
    history.push(`/admin/order/${id}`);
  };
  return (
    <React.Fragment>
      <Title>Thông kê chi tiết bán hàng theo khách hàng</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Mã đơn hàng</TableCell>
            <TableCell>Ngày đặt hàng</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Tổng sản phẩm</TableCell>

            <TableCell>Tổng doanh thu</TableCell>
            <TableCell align="right">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{formatDateAndHour(row.created_at)}</TableCell>
              <TableCell>
                {row.order_status === "NEW" && (
                  <Chip label="Đơn hàng mới" color="error" />
                )}
                {row.order_status === "CONFIRM" && (
                  <Chip label="Đã xác nhận" color="warning" />
                )}
                {row.order_status === "IN_PROGRESS" && (
                  <Chip label="Đang xử lí" color="error" />
                )}
                {row.order_status === "PACKAGED" && (
                  <Chip label="Đã đóng gói" color="warning" />
                )}
                {row.order_status === "PICKED" && (
                  <Chip label="Đang giao hàng" color="info" />
                )}
                {row.order_status === "DELIVERED" && (
                  <Chip label="Đã giao hàng" color="success" />
                )}
              </TableCell>
              <TableCell>{row.total_quantity}</TableCell>
              <TableCell>{formatPrice(row.total_income)}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleClick(row.id)}>
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button color="primary" onClick={preventDefault} sx={{ mt: 3 }}>
        Quay lại
      </Button>
    </React.Fragment>
  );
}
