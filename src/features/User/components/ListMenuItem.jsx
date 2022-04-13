import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from 'react-router-dom';
import Inventory2Icon from '@mui/icons-material/Inventory2';
function ListMenuItem(props) {
    return (
        <>
            <ListItem button component={Link} to="/user/profile" style={{ padding: '8px' }}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Tài khoản của tôi" />
            </ListItem>
            <ListItem button component={Link} to="/user/order" style={{ padding: '8px' }}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Đơn hàng đã mua" />
            </ListItem>
            {/* <ListItem button component={Link} to="/user/wishlist" style={{ padding: '8px' }}>
                <ListItemIcon>
                    <Inventory2Icon />
                </ListItemIcon>
                <ListItemText primary="Sản phẩm yêu thích" />
            </ListItem> */}
            <ListItem button component={Link} to="/user/change-password" style={{ padding: '8px' }}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Đổi mật khẩu" />
            </ListItem>
            <ListItem button component={Link} to="/user/address" style={{ padding: '8px' }}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Địa chỉ" />
            </ListItem>

        </>
    );
}

export default ListMenuItem;