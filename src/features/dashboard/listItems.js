import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
export const mainListItems = (
  <>
    <ListItem button component={Link} to="/admin/dashboard">
      <ListItemIcon style={{ color: "white" }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Trang chủ" />
    </ListItem>
    <ListItem button component={Link} to="/admin/orders">
      <ListItemIcon style={{ color: "white" }}>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Đơn hàng" />
    </ListItem>
    <ListItem button component={Link} to="/admin/product">
      <ListItemIcon style={{ color: "white" }}>
        <Inventory2Icon />
      </ListItemIcon>
      <ListItemText primary="Sản phẩm" />
    </ListItem>
    <ListItem button component={Link} to="/admin/users">
      <ListItemIcon style={{ color: "white" }}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Người dùng" />
    </ListItem>
    <ListItem button component={Link} to="/admin/category">
      <ListItemIcon style={{ color: "white" }}>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Danh mục" />
    </ListItem>
    <ListItem button component={Link} to="/admin/subcategory">
      <ListItemIcon style={{ color: "white" }}>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Danh mục con" />
    </ListItem>
    <ListItem button component={Link} to="/admin/brand">
      <ListItemIcon style={{ color: "white" }}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Thương hiệu" />
    </ListItem>

    <ListItem button component={Link} to="/admin/review">
      <ListItemIcon style={{ color: "white" }}>
        <ReviewsIcon />
      </ListItemIcon>
      <ListItemText primary="Đánh giá" />
    </ListItem>

    {/* <ListItem button component={Link} to="/admin/feeship">
      <ListItemIcon style={{ color: 'white' }}>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Phí vận chuyển" />
    </ListItem> */}
  </>
);

export const secondaryListItems = (
  <>
    <ListItem
      button
      component={Link}
      to="/admin/coupon"
      style={{ padding: "8px" }}
    >
      <ListItemIcon style={{ color: "white" }}>
        <AddCardOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Mã giảm giá" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to="/admin/support"
      style={{ padding: "8px" }}
    >
      <ListItemIcon style={{ color: "white" }}>
        <Badge badgeContent={4} color="secondary">
          <ChatBubbleOutlineOutlinedIcon />
        </Badge>
      </ListItemIcon>
      <ListItemText primary="Hỗ trợ" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to="/admin/statistics"
      style={{ padding: "8px" }}
    >
      <ListItemIcon style={{ color: "white" }}>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Xem thống kê" />
    </ListItem>
  </>
);
