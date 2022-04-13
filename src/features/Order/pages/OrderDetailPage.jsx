import { CardContent, Container, Divider, Grid, Paper, Typography, Chip } from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import LoadingLinear from 'components/LoadingLinear';
import TimeLine from 'features/User/components/TimeLine';
import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDateAndHour } from 'utils';
import { getOrderDetail, paymentOrder } from '../orderSlice';
import { convertUSD, formatPrice } from './../../../utils/common';
import OrderItem from './../components/OrderItem';
import orderApi from 'api/orderApi';
import useHttp from 'hooks/use-http';
const useStyles = makeStyles(theme => (
    {
        card: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }
    }
))
function OrderDetailPage(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const params = useParams();
    console.log(params)
    const orderID = params.orderId;
    const { loadingPay, isPaySuccess } = useSelector(state => state.order)
    const navigate = useNavigate()
    // const url = match.url;
    const { get } = orderApi;
    const { sendRequest: getOrderDetail, status, data: order, error } = useHttp(get, true)
    useEffect(() => {
        getOrderDetail(orderID)
    }, [orderID, getOrderDetail])
    useEffect(() => {
        if (!loadingPay && isPaySuccess) {
            navigate(`/order/payment/completed`, { state: { id: orderID } })
        }
    }, [navigate, loadingPay, isPaySuccess])
    const handleOrderClick = () => { }
    const [sdkReady, setSdkReady] = useState(false);
    console.log(`https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}`)
    useEffect(() => {
        const script = document.createElement('script');;
        const addPayPalScript = () => {

            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        console.log("sdasd", script)

        if (!window.paypal) {
            addPayPalScript();
        } else {
            setSdkReady(true);
        }


    }, [sdkReady]);
    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(paymentOrder({ id: orderID, paymentResult, status: "IN_PROGRESS" }))
        console.log(paymentResult);
    };

    return (
        <>
            {status === 'completed' && (<Container maxWidth="lg" >
                <Grid container spacing={2} >
                    <Grid item xs={12} >
                        <Paper>
                            <Box paddingY={1} textAlign="left" fontWeight="bold">
                                <Grid item container>
                                    <Grid item xs={4}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                Địa chỉ giao hàng
                                            </Typography>
                                            <Box sx={{ display: 'flex', mb: 1, alignItems: 'center', gap: 1 }}>
                                                <Typography variant='subtitle1' color="text.secondary">  Tên người nhận: </Typography>
                                                <Typography variant='body1'>{order.name_customer}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', mb: 1, alignItems: 'center', gap: 1 }}>
                                                <Typography variant='subtitle1' color="text.secondary"> Điện thoại: </Typography>
                                                <Typography variant='body1'>{order.phone}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', mb: 1, alignItems: 'flex-start', gap: 1 }}>
                                                <Typography minWidth="54px" variant='subtitle1' color="text.secondary"> Địa chỉ: </Typography>
                                                <Typography variant='body1'>{order.shippingAddress.address}, {order.shippingAddress.ward}, {order.shippingAddress.district},{order.shippingAddress.city}</Typography>
                                            </Box>



                                            {!order.isDelivered && (
                                                <AlertTitle color="text.secondary">Trạng thại đơn hàng:
                                                    {order.orderStatus === 'NEW' && (<Chip label="Đơn hàng mới" color="error" />)}
                                                    {order.orderStatus === 'CONFIRM' && (<Chip label="Đã xác nhận" color="warning" />)}
                                                    {order.orderStatus === 'IN_PROGRESS' && (<Chip label="Đang xử lí" color="error" />)}
                                                    {order.orderStatus === 'PACKAGED' && (<Chip label="Đã đóng gói" color="warning" />)}
                                                    {order.orderStatus === 'PICKED' && (<Chip label="Đang giao hàng" color="info" />)}
                                                    {order.orderStatus === 'DELIVERED' && (<Chip label="Đã giao hàng" color="success" />)}
                                                    {order.orderStatus === 'CANCEL' && (<Chip label="Đã hủy" color="error" />)}
                                                </AlertTitle>
                                            )}
                                            {order.isDelivered && (
                                                <Alert severity="success">

                                                    <strong>Đã giao hàng!</strong>
                                                </Alert>
                                            )}
                                        </CardContent>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Box padding={1}>

                                            <TimeLine timelines={order.orderTracks} />
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Divider variant="middle" />
                                <Box sx={{ my: 3, mx: 2 }}>
                                    <Typography variant="h5">
                                        Phương thức thanh toán :{order.paymentMethod}
                                    </Typography>
                                    {!order.isPaid && (
                                        <Alert severity="error">
                                            <strong> Chưa thanh toán!</strong>
                                        </Alert>
                                    )}
                                    {order.isPaid && (
                                        <Alert severity="success">

                                            Đã thanh toán — <strong>{formatDateAndHour(order.paidAt)}</strong>
                                        </Alert>
                                    )}
                                </Box>
                                <Divider variant="middle" />
                                <Box sx={{ my: 3, mx: 2 }}>
                                    <Typography variant="h5">
                                        Sản phẩm

                                    </Typography>
                                    <Grid container>
                                        {order.orderItems.map((item) => (
                                            <OrderItem item={item} key={item._id}></OrderItem>
                                        ))}

                                    </Grid>
                                </Box>
                            </Box>

                        </Paper>
                    </Grid>
                    <Grid item xs={12} textAlign="right" >
                        <Paper sx={{ textAlign: 'right', p: 1 }}>
                            <Box sx={{ maxWidth: 300, ml: 'auto', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant='subtitle1' color="text.secondary">Tổng tiền hàng: </Typography>
                                <Typography variant='body1'>{formatPrice(order.total)}</Typography>
                            </Box>
                            <Box sx={{ maxWidth: 300, ml: 'auto', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant='subtitle1' color="text.secondary"> Phí vận chuyển: </Typography>
                                <Typography variant='body1'>{formatPrice(order.shippingPrice)}</Typography>
                            </Box>

                            {/* {coupon && (<Box  padding='10px' >
                    <Typography variant='body1'> Giảm giá: -{formatPrice(discount)}</Typography> */}

                            {/* </Box>)} */}
                            <Box sx={{ maxWidth: 300, ml: 'auto', display: 'flex', justifyContent: 'space-between' }} >
                                <Typography variant='h6' color="text.secondary">Tổng thanh toán: </Typography>
                                <Typography variant='h6' color="InfoText">{formatPrice(order.total)}</Typography>
                            </Box>


                            {!sdkReady && (
                                <span>Loading...........................</span>)}

                            {/* // <>
                        // {errorPay && (
                        //             <MessageBox variant="danger">{errorPay}</MessageBox>
                        //         )}
                        //         {loadingPay && <LoadingBox></LoadingBox>} */}


                            {/* {loadingPay && <LoadingLinear />} */}
                            {!order.isPaid && order.paymentMethod === 'Thanh toán bằng thẻ tín dụng' && (
                                <PayPalButton
                                    amount={convertUSD(order.total)}
                                    onSuccess={successPaymentHandler}

                                ></PayPalButton>

                            )}

                        </Paper>





                    </Grid>
                </Grid>


            </Container >)
            }
        </>
    );
}

export default OrderDetailPage;