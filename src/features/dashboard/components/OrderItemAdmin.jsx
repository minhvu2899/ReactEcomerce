import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Typography, Avatar, Button, IconButton } from '@mui/material';
import Chip from '@mui/material/Chip';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import { formatDate, formatPrice } from 'utils';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { Link, useNavigate } from 'react-router-dom';
import { STATIC_HOST } from 'constants/index';
OrderItemAdmin.propTypes = {

};
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
function OrderItemAdmin({ item, onChangeStatus, onHandelClick, onHandelPrintBill }) {
    const navigate = useNavigate()
    const handelUpdateStatus = (status) => {
        if (!onChangeStatus) {
            return;
        }
        onChangeStatus(status);
    }
    const handelClick = (id) => {
        if (!onHandelClick) {
            return;
        }
        onHandelClick(id);
    }
    const handelPrintBill = (bill_code) => {
        if (!onHandelPrintBill) {
            return;
        }
        onHandelPrintBill(bill_code);
    }
    const handelViewOrder = (id) => {
        navigate(`/admin/order/${id}`)
    }
    return (
        <Grid item container style={{ marginBottom: '10px', marginLeft: '10px', cursor: 'pointer' }} >
            <Grid item container justify="space-between" alignItems="center" xs={12} style={{ border: '1px solid #ccc', borderBottom: 'none', backgroundColor: '#eee' }} onClick={() => handelClick(item._id)}>
                <Grid item xs={6}
                    align="center">
                    <Box style={{ display: 'flex', alignItems: 'center' }} padding={1}>
                        <Avatar style={{ width: 24, height: 24 }} />
                        <Typography variant="subtitle1"> Vhm2899</Typography>
                    </Box>


                </Grid>
                <Grid item xs={6} align="right">
                    <Typography>Mã đơn hàng: {item._id}</Typography>
                </Grid>
            </Grid>
            {item.orderItems.map(i => (
                <Grid key={i._id} item container alignItems="center" xs={12} style={{ border: '1px solid #ccc' }}>

                    <Grid item xs={2} align="left">
                        <ButtonBase sx={{ width: 100, height: 100 }}>
                            <Img alt="complex" src={i.image} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={2} align="left" >
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div" noWrap>
                                    {i.product_name}
                                </Typography>


                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid item xs={2} align="left" >
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    {formatPrice(item.total)}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {item.paymentMethod}
                                </Typography>

                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid item xs={1} align="left" >
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    {item.orderStatus === 'NEW' && (<Chip label="Đơn hàng mới" color="error" />)}
                                    {item.orderStatus === 'CONFIRM' && (<Chip label="Đã xác nhận" color="warning" />)}
                                    {item.orderStatus === 'IN_PROGRESS' && (<Chip label="Đang xử lí" color="error" />)}
                                    {item.orderStatus === 'PACKAGED' && (<Chip label="Đã đóng gói" color="warning" />)}
                                    {item.orderStatus === 'PICKED' && (<Chip label="Đang giao hàng" color="info" />)}
                                    {item.orderStatus === 'DELIVERED' && (<Chip label="Đã giao hàng" color="success" />)}
                                    {item.orderStatus === 'CANCEL' && (<Chip label="Đã hủy" color="error" />)}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {formatDate(item.createdAt)}
                                </Typography>

                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid item xs={3} align="right" >
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>

                                {item.bill_code && (
                                    <Typography gutterBottom variant="subtitle1" component="div">

                                        Giao hàng tiết kiệm
                                    </Typography>

                                )}
                                {!item.bill_code && (
                                    <Typography gutterBottom variant="subtitle1" component="div">

                                        Chưa có thông tin
                                    </Typography>

                                )}


                                <Typography gutterBottom variant="subtitle1" component="div">
                                    {item.bill_code}
                                </Typography>
                                {item.bill_code && (
                                    <Typography variant="body2" gutterBottom>
                                        <Link onClick={() => handelPrintBill(item.bill_code)}>In phiếu giao</Link>
                                    </Typography>
                                )}


                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid item xs={2} align="right" >
                        {item.orderStatus === 'NEW' && (
                            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'green' }}>
                                <IconButton style={{ color: 'inherit' }}>
                                    <CheckCircleIcon /></IconButton>
                                <Button onClick={() => handelUpdateStatus({ id: item._id, status: 'IN_PROGRESS' })}>Xác nhận đơn</Button>
                            </Box>


                        )}
                        {item.orderStatus === 'IN_PROGRESS' && (
                            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#ff8e53' }}>
                                <IconButton style={{ color: 'inherit' }}>
                                    <AirportShuttleIcon /></IconButton>
                                <Button color="secondary" onClick={() => handelUpdateStatus({ id: item._id, status: 'PACKAGED' })}>Đã đóng gói</Button>
                            </Box>

                        )}
                        {item.orderStatus === 'PACKAGED' && (<Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <IconButton>
                                <EmojiPeopleIcon /></IconButton>
                            <span onClick={() => handelUpdateStatus({ id: item._id, status: 'PICKED' })}>Gửi hàng</span>
                        </Box>)}
                        {item.orderStatus === 'PICKED' && (<Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <IconButton>
                                <EmojiPeopleIcon /></IconButton>
                            <span onClick={() => handelUpdateStatus({ id: item._id, status: 'DELIVERED' })}>Xác nhận đã giao hàng</span>
                        </Box>)}
                        {item.orderStatus === 'DELIVERED' && (<Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <IconButton>
                                <EmojiPeopleIcon /></IconButton>
                            <span onClick={() => handelViewOrder(item._id)}>Xem chi tiết</span>
                        </Box>)}
                        {item.orderStatus === 'CANCEL' && (<Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <IconButton>
                                <EmojiPeopleIcon /></IconButton>
                            <span onClick={() => handelViewOrder(item._id)}>Xem chi tiết</span>
                        </Box>)}
                    </Grid>
                </Grid>
            ))
            }

        </Grid >
    );
}

export default OrderItemAdmin;