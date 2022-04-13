import { AddShoppingCart } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { Badge } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { logout } from 'features/Auth/userSlice';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { cartItemsCountSelector } from './../../features/Cart/selectors';
import SearchField from './SearchField';
const pages = [
    { name: 'Trang chủ', url: '/' }, { name: 'Sản phẩm', url: '/product' }];
const settings = [{ name: 'Thông tin cá nhân', url: '/user/profile' }, { name: 'Địa chỉ', url: '/user/address' }, { name: 'Đơn hàng', url: '/user/order' }];

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchText, setSearchText] = React.useState('');
    const cartRef = React.useRef();
    const { isLogin } = useSelector(state => state.user);
    const { showMiniCart } = useSelector(state => state.cart);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElCart, setAnchorElCart] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const totalCartItem = useSelector(cartItemsCountSelector);
    const photo = useSelector(state => state.user.current.photo);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenCartMenu = (event) => {

        setAnchorElCart(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {

        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleLogoutClick = () => {
        setAnchorElUser(null);
        const action = logout();
        dispatch(action);

    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handelSearchClick = () => {

        navigate('/product', { state: { searchText } })
        // setSearchText('')
    };

    return (

        <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #FF8E53 30%,#FE6B8B 90%) ', height: { md: "100px" }, }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ width: '100px', mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        VHM
                    </Typography>
                    <SearchField onChange={setSearchText} value={searchText} onSearch={handelSearchClick} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} component={Link}
                                    to={page.url} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                component={Link}
                                to={page.url}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ mr: 3 }}>

                        <IconButton color="inherit" component={Link} aria-controls="cart" id="cart" ref={cartRef}
                            to="cart" sx={{ fontSize: 35 }}>
                            {isLogin && (

                                <Badge badgeContent={totalCartItem} color="secondary">
                                    <AddShoppingCart />
                                </Badge>

                            )}
                            {!isLogin && (

                                <AddShoppingCart />


                            )}



                        </IconButton>

                        <Menu
                            id="cart"
                            anchorEl={cartRef.current}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}

                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={false}

                        // sx={{
                        //     display: { xs: 'block', md: 'none' },
                        // }}
                        >


                            <Typography textAlign="center">Thêm vào giỏ thành công</Typography>

                            <Button variant="contained" color="primary">Xem giỏ hàng</Button>

                        </Menu>

                    </Box>
                    <Box sx={{ flexGrow: 0, display: 'flex' }}>

                        {isLogin && (
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {/* <IconButton onClick={handleOpenCartMenu} sx={{ p: 0 }}> */}

                                    <Avatar alt="Remy Sharp" src={photo} />
                                </IconButton>


                            </Tooltip>
                        )}
                        {!isLogin && (
                            <MenuItem component={Link}
                                to="/auth/login">
                                <Typography textAlign="center">Đăng nhập</Typography>
                            </MenuItem>
                        )}
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem to={setting.url} component={Link} key={setting.name} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            ))}
                            <MenuItem onClick={handleLogoutClick}>
                                <Typography textAlign="center">Đăng xuất</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >

    );
};
export default Header;