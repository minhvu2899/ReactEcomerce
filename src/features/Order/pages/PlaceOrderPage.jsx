import { Box, Container, Divider, FormControlLabel, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import addressApi from 'api/addressApi';
import ButtonCustom from 'components/ButtonCustom';
import ModalCustom from 'components/ModalCustom';
import { resetCart } from 'features/Cart/cartSlice';
import { reset } from 'features/Order/orderSlice';
import { cartItemsTotalSelector } from 'features/Cart/selectors';
import FormAddress from 'features/User/components/FormAddress';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatPrice } from 'utils';
import useHttp from '../../../hooks/use-http';
import CheckoutStep from '../components/CheckoutStep';
import ListItem from '../components/ListItem';
import Payment from '../components/Payment';
import ShippingAddress from '../components/ShippingAddress';
import { createOrder } from '../orderSlice';

function PlaceOrderPage(props) {
    const [open, setOpen] = useState(true);
    const [isChangeAddress, setIsChangeAddress] = useState(false);
    const [paymentMethod, setPaymentMethod] = React.useState('Thanh toán khi nhận hàng');
    const [shipMethod, setShipMethod] = React.useState('Giao hàng tiết kiệm');
    const user = useSelector(state => state.user)
    const { _id: orderID } = useSelector(state => state.order.order)
    const { isSuccess } = useSelector(state => state.order)
    const navigate = useNavigate();
    const { isLogin } = useSelector(state => state.user);
    const totalCartItems = useSelector(cartItemsTotalSelector)
    const { _id } = useSelector(state => state.user.current);
    const [shippingPrice, setShippingPrice] = useState(10000)
    const cartItems = useSelector(state => state.cart.cartItems)
    const [discount, setDiscount] = useState(0)
    const order_items = cartItems.map(item => ({
        image: item.product.imageCover.url,
        price: item.product.priceSale,
        product_name: item.product.name,
        quantity: item.quantity,
        product: item.product,

    }))
    if (!isLogin) {
        navigate('/login')
    }
    const [shippingAddress, setShippingAddress] = React.useState({});
    const [addressValue, setAddressValue] = React.useState('');
    const dispatch = useDispatch();
    const { getAll, update, add, remove } = addressApi;
    const { sendRequest: getAllAddress, status, data: addresses, error } = useHttp(getAll, false)
    const { sendRequest: addAddress, status: statusAdd, data, error: errorAdd } = useHttp(add, false)
    useEffect(() => {

        if (status === 'completed' && !error) {
            const shippingAddress = addresses.find(address => address.isDefault)

            shippingAddress && setShippingAddress(shippingAddress)
            shippingAddress && setAddressValue(shippingAddress._id)
            // enqueueSnackbar("Get Thành công", { variant: "success" })
        }
        if (status === 'completed' && error) {
            // enqueueSnackbar(error, { variant: "error" })
        }
    }, [status, error, addresses])
    useEffect(() => {

        isSuccess && navigate(`/user/order/${orderID}`)
    }, [isSuccess, orderID, navigate])
    useEffect(() => {

        if (statusAdd === 'completed' && !errorAdd) {
            setShippingAddress(data)

        }
        if (statusAdd === 'completed' && errorAdd) {
            // enqueueSnackbar(errorAdd, { variant: "error" })
        }
    }, [statusAdd, errorAdd, data, dispatch, navigate])
    useEffect(() => {
        if (statusAdd === 'completed' && !errorAdd) {
            getAllAddress()
        }
        else {

            getAllAddress()
        }
    }, [getAllAddress, statusAdd, errorAdd])
    const handleSubmit = (values) => {
        console.log(values)
        // setOpen(true);
        addAddress({ ...values, user: _id })
        setOpen(false)
    }
    const handleChange = (event) => {

        const address = addresses.find(address => address.id === event.target.value);
        setAddressValue(event.target.value);
        setShippingAddress(address)

    }
    const handleOrderClick = async () => {

        const order = {
            name_customer: shippingAddress.name,
            email: "vhm2899@gmail.com",
            phone: shippingAddress.phone,
            shippingAddress: { address: shippingAddress.address, ward: shippingAddress.ward, district: shippingAddress.district, city: shippingAddress.city },
            paymentMethod,
            orderItems: order_items,
            user: _id,
            // coupon_code,
            // coupon_value: discount,
            shippingPrice: 10000,
            // product_cost,
            total: totalCartItems + shippingPrice - discount
        }
        try {
            const resultAction = await dispatch(createOrder(order));
            const result = unwrapResult(resultAction);

            toast.success(
                'Đặt hàng thành công'
            )
            await dispatch(resetCart());
            await dispatch(reset())


            // console.log("Fetch:", user);
        } catch (error) {


            const message = error.message;
            toast.error(message)
        }

    }

    const handelCloseModal = () => {
        navigate({ pathname: '/cart' })
        setOpen(false)
    }
    const handelOnChangeAddress = () => {

        setIsChangeAddress(pre => !pre)
    }

    return (
        <Container>
            <Paper elevation={1}>

                <Box sx={{ width: '100%' }}>
                    <CheckoutStep step={isChangeAddress ? 1 : 2} />
                    <Box sx={{ textAlign: 'left', p: 1 }}>
                        <Typography fontWeight="bold" variant="h6">1. Địa chỉ giao hàng</Typography>
                    </Box>
                    {!isChangeAddress && addressValue &&
                        <Paper elevation={0} sx={{ mb: { md: 2, xs: 0 }, p: 1 }}>
                            <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                                <Typography color="text.primary" sx={{ pr: 1, borderRight: '1px solid #ccc', mr: 1, fontWeight: 'bold' }}>{shippingAddress.name}</Typography>
                                <Typography fontWeight="bold" paddingRight={1}>{shippingAddress.phone}</Typography>
                                <Typography align="left" color="text.secondary" paddingRight={1}>{shippingAddress.address},   {shippingAddress.ward},   {shippingAddress.district}, {shippingAddress.city}</Typography>
                                <Box sx={{ maxWidth: '100px' }}>
                                    <ButtonCustom variant="contained" color="error" onClick={handelOnChangeAddress}>Thay đổi</ButtonCustom>


                                </Box>

                            </Box>
                        </Paper>}
                    {isChangeAddress &&
                        <Paper variant="outlined">
                            <Box sx={{ display: 'flex', flexDirection: 'column', p: 1, m: 1 }}>
                                <RadioGroup
                                    aria-label="gender"
                                    defaultValue={0}
                                    name="radio-buttons-group"
                                    value={addressValue}
                                    onChange={handleChange}
                                >
                                    {status === 'completed' && addresses.length > 0 && addresses.map(address => (

                                        <FormControlLabel key={address.id} style={{ width: '100%', boxSizing: 'border-box' }} value={address.id} control={<Radio />} label={<ShippingAddress address={address} />} />



                                    ))}


                                </RadioGroup>
                                <Box sx={{ maxWidth: '100px' }}>
                                    <ButtonCustom type="submit" onClick={handelOnChangeAddress}>Xác nhận</ButtonCustom>

                                </Box>
                            </Box>

                        </Paper>


                    }
                    {status === 'completed' && addresses.length === 0 && (
                        <Container maxWidth="sm">
                            <ModalCustom open={open} title="Thêm địa chỉ mới" onClose={handelCloseModal}>
                                <FormAddress onSubmit={handleSubmit} />
                            </ModalCustom>
                        </Container>
                    )}
                </Box>
                <Divider />
            </Paper>
            <ListItem items={order_items} />
            <Payment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} shipMethod={shipMethod} setShipMethod={setShipMethod} />
            <Paper sx={{ textAlign: 'right', p: 1 }}>
                <Box sx={{ maxWidth: 300, ml: 'auto', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant='subtitle1' color="text.secondary">Tổng tiền hàng: </Typography>
                    <Typography variant='body1'>{formatPrice(100000)}</Typography>
                </Box>
                <Box sx={{ maxWidth: 300, ml: 'auto', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant='subtitle1' color="text.secondary"> Phí vận chuyển: </Typography>
                    <Typography variant='body1'>{formatPrice(10000)}</Typography>
                </Box>

                {/* {coupon && (<Box  padding='10px' >
                    <Typography variant='body1'> Giảm giá: -{formatPrice(discount)}</Typography> */}

                {/* </Box>)} */}
                <Box sx={{ maxWidth: 300, ml: 'auto', display: 'flex', justifyContent: 'space-between' }} >
                    <Typography variant='h6' color="text.secondary">Tổng thanh toán: </Typography>
                    <Typography variant='h6' color="InfoText">{formatPrice(totalCartItems + 10000)}</Typography>
                </Box>
                {/* <form onSubmit={handelCouponSubmit}>
                    <Box padding={1} style={{ display: 'flex' }}>
                        <TextField
                            id="coupon"
                            label="Mã giảm giá"
                            type="text"
                            fullWidth
                            autoComplete="false"
                            value={coupon_code}
                            onChange={handleCouponChange}
                            autoCapitalize
                            helperText={errorCoupon ? errorCoupon : ''}
                            error={errorCoupon ? true : false}

                        />
                        <Button color="primary" variant="contained" type="submit"
                        >Sử dụng</Button>
                    </Box>
                </form>
                {!!coupon && (<Alert severity="success">Nhập mã giảm giá thành công</Alert>)} */}
                <Box sx={{ width: '300px', ml: 'auto', display: 'flex', my: 2 }}>
                    <ButtonCustom type="submit" onClick={handleOrderClick}>Đặt hàng</ButtonCustom>

                </Box>
            </Paper>

        </Container >
    );
}

export default PlaceOrderPage;