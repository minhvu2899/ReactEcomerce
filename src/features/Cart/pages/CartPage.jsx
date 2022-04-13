import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonCustom from 'components/ButtonCustom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from 'utils';
import { getCartItems } from '../cartSlice';
import CartList from '../components/CartList';
import { cartItemsCountSelector, cartItemsTotalSelector } from '../selectors';

const CartPage = () => {
    const { isLogin } = useSelector(state => state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems)
    const totalCartItem = useSelector(cartItemsCountSelector);
    const totalCartItems = useSelector(cartItemsTotalSelector);

    const handleClick = () => {
        navigate('/product')
    }
    useEffect(() => {
        dispatch(getCartItems())
    }, [dispatch])
    if (!isLogin) {
        return <p>Vui lòng đăng nhập</p>
    }

    if (cartItems.length === 0 || !isLogin) {
        return (
            <>
                <Box >
                    <img src="https://bizweb.dktcdn.net/100/411/922/themes/800986/assets/empty-cart.png?1607914671664" alt=""></img>
                    <Button color="primary" variant="contained" onClick={handleClick}>Tiếp tục mua hàng</Button>
                </Box>
            </>
        )
    }
    return (
        <Box sx={{ flexGrow: 1, m: { xs: 1, md: 4 } }} >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={9} sx={{ p: { md: 3, xs: 0 } }}>
                    <Paper elevation={0} sx={{ mb: { md: 2, xs: 0 } }}>
                        <Grid container justifyContent="center"
                            alignItems="center">
                            <Grid item xs={4} textAlign="left" padding={1}>
                                <Typography variant="subtitle1">Tất cả({totalCartItem} sản phẩm)</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="subtitle1">Đơn giá</Typography>
                            </Grid>
                            <Grid item md={3}>
                                <Typography variant="subtitle1">Số lượng</Typography>
                            </Grid>
                            <Grid item md={2}>
                                <Typography variant="subtitle1">Thành tiền</Typography>
                            </Grid>
                            <Grid item md={1}>
                                <Typography variant="subtitle1"> <DeleteForeverIcon /></Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                    <CartList cartItems={cartItems} />
                </Grid>
                <Grid item xs={12} sm={3}>

                    {/* <Paper elevation={0} sx={{ mb: { md: 2, xs: 0 }, p: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography color="text.primary" fontWeight="bold" variant="h6">Mã giảm giá</Typography>
                            <Link underline="none" color="inherit">2 lựa chọn</Link>
                        </Box>
                        <Box sx={{ display: 'flex', mt: 3 }}>
                            <Link underline="none">
                                <Typography variant="subtitle1">Chọn hoặc nhập khuyến mại khác</Typography>
                            </Link>

                        </Box>

                    </Paper> */}
                    <Paper elevation={0} sx={{ mb: { md: 2, xs: 0 }, p: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography color="text.secondary">Tạm tính</Typography>
                            <Typography color="text.primary" fontWeight="bold">{formatPrice(totalCartItems)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, borderBottom: '1px solid #ccc' }}>
                            <Typography color="text.secondary">Giảm giá</Typography>
                            <Typography color="text.primary" fontWeight="bold">{formatPrice(0)}</Typography>

                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography color="text.primary">Tổng cộng</Typography>
                            <Typography sx={{ fontSize: 24, fontWeight: 'bold' }} color="text.primary" >{formatPrice(totalCartItems)}</Typography>
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', mt: 2 }}>
                            <ButtonCustom onClick={() => navigate('/order/place-order')}>Tiếp tục đặt hàng</ButtonCustom>
                        </Box>


                    </Paper>
                </Grid>

            </Grid>
        </Box >
    )
}

export default CartPage