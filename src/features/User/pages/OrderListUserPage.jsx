import React from 'react';
import PropTypes from 'prop-types';
import LoadingLinear from 'components/LoadingLinear';
import OrderItem from 'features/Order/components/OrderItem';
import Order from '../components/Order';
import { Box, Paper, Grid, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';

OrderListUserPage.propTypes = {

};

function OrderListUserPage({ orders, handelOnClick, setOpenCancel }) {
    console.log("orrder", orders)
    const handleOrderClick = (item) => {
        handelOnClick(item)
    }
    const handelViewRating = (item) => {
        handelOnClick(item)
    }

    return (
        <Box padding={1}>
            {/* {status === 'pending' && <LoadingLinear />} */}

            {orders.length > 0 && (
                orders.map((item, i) => (



                    <Paper key={item._id}>

                        <Grid container style={{ width: '100%', padding: '10px' }}>
                            <Grid item xs={6}>
                                <Typography variant="body1">
                                    ID ĐƠN HÀNG:{item._id}
                                </Typography>

                            </Grid>
                            <Grid item xs={6} align="right">
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    {item.orderStatus === 'NEW' && (<Chip label="Đơn hàng mới" color="error" />)}
                                    {item.orderStatus === 'CONFIRM' && (<Chip label="Đã xác nhận" color="warning" />)}
                                    {item.orderStatus === 'IN_PROGRESS' && (<Chip label="Đang xử lí" color="error" />)}
                                    {item.orderStatus === 'PACKAGED' && (<Chip label="Đã đóng gói" color="warning" />)}
                                    {item.orderStatus === 'PICKED' && (<Chip label="Đang giao hàng" color="info" />)}
                                    {item.orderStatus === 'DELIVERED' && (<Chip label="Đã giao hàng" color="success" />)}
                                    {item.orderStatus === 'CANCEL' && (<Chip label="Đã hủy" color="error" />)}
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* <Order id={item.id} item={item.orderItems} comments={item.orderItems}  /> */}
                        <Order item={item} key={item._id} handelOnClick={handleOrderClick} handelCancelOrderClick={setOpenCancel} />
                    </Paper>


                ))
            )
            }
        </Box >
    );
}

export default OrderListUserPage;