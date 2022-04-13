import { CardContent, Container, Divider, Grid, Paper, Typography, Button } from '@mui/material';
import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OrderItem from 'features/Order/components/OrderItem';
import TimeLine from 'features/User/components/TimeLine';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { formatPrice } from '../../../../utils/common';
import { getOrderDetail } from '../../../Order/orderSlice';
import { useState } from 'react';
import CreateOrderTrackPage from './CreateOrderTrackPage';
import useHttp from 'hooks/use-http';
import orderTrackApi from 'api/orderTrackApi';
import { toast } from 'react-toastify';
import orderApi from 'api/orderApi';
import { formatDateAndHour } from 'utils';
function OrderDetailPage(props) {
    const dispath = useDispatch()
    const params = useParams();
    const orderID = params.id;

    const { isSuccess, order } = useSelector(state => state.order)
    const [status, setStatus] = React.useState('');

    const { add } = orderTrackApi;
    const { updateStatus } = orderApi;
    const { sendRequest: createOrderTrack, status: statusAddOrderTrack, data: orderTrack, error: errorAddOrderTrack } = useHttp(add, false)
    const { sendRequest: updateOrderStatus, status: statusUpdateStatus, error: errorUpdateOrderStatus } = useHttp(updateStatus, false)
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);

    };
    useEffect(() => {

        if (statusAddOrderTrack === 'completed' && !errorAddOrderTrack) {
            // enqueueSnackbar("Them thành công", { variant: "success" })
            setOpen(false);

        }
        if (statusAddOrderTrack === 'completed' && errorAddOrderTrack) {
            // enqueueSnackbar(errorAddOrderTrack, { variant: "error" })
        }
    }, [statusAddOrderTrack, errorAddOrderTrack])
    useEffect(() => {
        if (statusAddOrderTrack === 'completed' || statusUpdateStatus === 'completed') {
            dispath(getOrderDetail(orderID))
        }
        else {

            dispath(getOrderDetail(orderID))
        }
    }, [dispath, orderID, statusAddOrderTrack, statusUpdateStatus])
    // const handleOrderClick = () => { }
    const handelAddTrackClick = () => {
        setOpen(true);
    }
    const handelSubmit = (values) => {
        const orderTrack = { order: { id: orderID }, ...values }

        createOrderTrack(orderTrack)
    }
    const handelSubmitUpdateStatus = (e) => {
        e.preventDefault();
        updateOrderStatus({ id: orderID, status })
    }
    return (
        <>
            {isSuccess && (<Container Container maxWidth="lg" >
                <Grid container spacing={1} >
                    <Grid item xs={12} >
                        <Box marginBottom={1} >
                            <Grid container item spacing={2}>
                                <Grid item xs={4}>
                                    <Box paddingY={1} textAlign="left" fontWeight="bold">
                                        <Paper>


                                            <CardContent>
                                                <Typography variant="h5" component="div">
                                                    Địa chỉ giao hàng
                                                </Typography>
                                                <Typography color="text.secondary" gutterBottom>
                                                    Tên người nhận: {order.name_customer}
                                                </Typography>
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    Điện thoại: {order.phone}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {/* {order.shippingAddress.city} */}
                                                </Typography>
                                                {order.order_status === 'NEW' && (
                                                    <Alert severity="error">
                                                        <strong>Chưa xác nhận!</strong>
                                                    </Alert>
                                                )}
                                                {order.orderStatus === 'CONFIRM' && (
                                                    <Alert severity="error">
                                                        <strong> Xác nhận đơn hàng!</strong>
                                                    </Alert>
                                                )}
                                                {order.orderStatus === 'IN_PROGRESS' && (
                                                    <Alert severity="error">
                                                        <strong>Đang xử lý đơn hàng!</strong>
                                                    </Alert>
                                                )}
                                                {order.orderStatus === 'PICKED' && (
                                                    <Alert severity="error">
                                                        <strong> Đã lấy hàng!</strong>
                                                    </Alert>
                                                )}
                                                {order.orderStatus === 'DELIVERED' && (
                                                    <Alert severity="error">
                                                        <strong> Đã giao hàng!</strong>
                                                    </Alert>
                                                )}
                                                {order.orderStatus === 'PAID' && (
                                                    <Alert severity="error">
                                                        <strong> Đã thanh toán!</strong>
                                                    </Alert>
                                                )}
                                                {order.orderStatus === 'CANCEL' && (
                                                    <Alert severity="error">
                                                        <strong>Đã hủy đơn</strong>
                                                    </Alert>
                                                )}
                                                {order.orderStatus === 'DONE' && (
                                                    <Alert severity="error">
                                                        <strong> Đơn hàng hoàn thành.Kết thúc đơn hàng!</strong>
                                                    </Alert>
                                                )}
                                                {order.isDelivered && (
                                                    <Alert severity="success">

                                                        <strong>Đang giao hàng!</strong>
                                                    </Alert>
                                                )}
                                            </CardContent>

                                        </Paper>
                                    </Box>
                                </Grid>
                                <Grid item xs={8} align="left">
                                    <Box padding={1}>
                                        <Paper>
                                            <Box padding={1}>

                                                <TimeLine timelines={order.orderTracks} />
                                            </Box>
                                        </Paper>
                                    </Box>
                                </Grid>

                            </Grid>
                        </Box>
                        <Grid container item align="left">
                            <Grid item xs={12}>
                                <Paper>
                                    <Divider variant="middle" />
                                    <Box sx={{ my: 3, mx: 2 }}>
                                        <Typography variant="h5">
                                            Phương thức thanh toán: {order.paymentMethod}
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
                                            Order Item

                                        </Typography>
                                        <Grid container>
                                            {order.orderItems.map((item) => (
                                                <OrderItem item={item} key={item.id}></OrderItem>
                                            ))}

                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>


                        </Grid>
                    </Grid>
                    <Grid item xs={12} align="right">
                        <Box padding={1}>
                            <Paper>
                                <Box padding={1} textAlign='left'>
                                    <Typography variant='h6'>Tạm tính: {formatPrice(order.subtotal)}</Typography>
                                    <Typography variant='h6'>Phí ship: {formatPrice(order.feeship)}</Typography>
                                    <Typography variant='h4'>Tổng tiền: {formatPrice(order.total)}</Typography>

                                </Box>
                                <Box padding={1}>
                                    <Box padding={1}>
                                        <Typography variant="h6" align="left">Cập nhật trạng thái:</Typography>
                                    </Box>
                                    <form onSubmit={handelSubmitUpdateStatus}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                                            <Select
                                                labelId="status-select-label"
                                                id="status-select"
                                                value={status}
                                                label="Trạng thái"
                                                onChange={handleChange}
                                            >
                                                {order.order_status === 'NEW' && (
                                                    <MenuItem value="CONFIRM">Xác nhận đơn hàng</MenuItem>
                                                )}
                                                {order.order_status === 'IN_PROGRESS' && (
                                                    <MenuItem value="PACKAGED">Đã đóng gói</MenuItem>
                                                )}
                                                {order.order_status === 'PACKAGED' && (
                                                    <MenuItem value="PICKED">Đã lấy hàng</MenuItem>
                                                )}
                                                {order.order_status === 'PICKED' && (
                                                    <MenuItem value="DELIVERED">Đã giao hàng</MenuItem>
                                                )}

                                                {/* <MenuItem value="IN_PROGRESS">Đang xử lí</MenuItem>



                                                <MenuItem value="PAID">Đã thanh toán</MenuItem>
                                                <MenuItem value="RETURNED">Hoàn trả</MenuItem>
                                                <MenuItem value="DONE">Hoàn thành</MenuItem> */}
                                            </Select>
                                        </FormControl>
                                        <Button variant="contained" color="primary" maxWidth type="submit">Cập nhật</Button>
                                    </form>
                                    <Button variant="contained" color="primary" onClick={handelAddTrackClick}>Add Order track</Button>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                    <CreateOrderTrackPage open={open} handleChange={handleClose} onSubmit={handelSubmit} />
                </Grid>


            </Container >)
            }
        </>
    );
}


export default OrderDetailPage;