import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Divider, Grid, Typography, Button, Dialog, IconButton, DialogTitle, DialogContent, TextField } from '@mui/material';
import OrderItem from 'features/Order/components/OrderItem';
import { formatPrice } from 'utils';
import { Link } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import { useState } from 'react';
import ModalViewRating from './ModalViewRating';
import ModalCancelOrder from './ModalCancelOrder';
import { makeStyles } from '@mui/styles'

function checkRating(comments, order_items) {
    const newOrder_items = order_items.map(o => {
        const check = comments.some(comment => comment.product.id === o.product.id)
        if (check) {
            return { ...o, isRating: true }
        }
        return { ...o, isRating: false }
    })
    return newOrder_items
}
function Order(props) {
    const { item, handelOnClick, comments, onViewRating, handelCancelOrderClick, idOrder } = props
    const useStyles = makeStyles(theme => ({
        root: {
            cursor: 'pointer',
        },
        link: {
            width: '100%',
            textDecoration: 'none',
            color: 'black',
            display: 'block'
        }
    }))


    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openCancel, setOpenCancel] = useState(false);
    const [comment, setComment] = useState({});
    const handleClose = () => {
        setOpen(false);

    };
    const total = item.orderItems.reduce((total, item) => total + item.quantity * item.price, 0)
    const handelButtonClick = () => {
        handelOnClick()
    }
    const handelViewRating = (id) => {
        const comment = comments.find(comment => comment.product.id === id)
        setComment(comment)
        setOpen(true);
    }
    const handelCancelClick = (id) => {
        handelCancelOrderClick(id)
        // setOrder(id)
    }
    const handelRating = (values) => {
        handelOnClick(values)

    }

    // order_items = checkRating(comments, order_items)
    // console.log(order_items)
    return (
        <Box padding={1} marginBottom={1} >

            <Box>
                <Grid container align="left">
                    <Grid item xs={3}>
                        <Typography variant="h6">Sản phẩm</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="h6">Giá</Typography>
                    </Grid>
                    <Grid item xs={4} align="right">
                        <Typography variant="h6">Thành tiền</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Divider />
            <Box padding={1} className={classes.root}>
                <Grid container align="left" >


                    {item.orderItems.map((i) => (
                        <>
                            <Link to={`${item._id}`} className={classes.link}>
                                <OrderItem item={i} key={item._id} />
                            </Link>

                            {(item.orderStatus === 'DELIVERED' && item.isRating) && (
                                <Box sx={{ width: '100%' }} padding={1}>
                                    <Button variant="outlined" color="secondary" onClick={() => handelViewRating(item.product.id)}>Xem đánh giá</Button>
                                    <Divider />
                                </Box>
                            )}
                            {(item.orderStatus === 'DELIVERED' && !item.isRating) &&
                                (
                                    <Box sx={{ width: '100%' }} padding={1}>
                                        <Button variant="outlined" color="secondary" onClick={() => handelRating({ product: i })}>Đánh giá</Button>
                                        <Divider />
                                    </Box>
                                )}

                        </>
                    ))}
                </Grid>
            </Box>
            <Box padding={1}>
                <Typography variant="h5" align="right"> Tổng tiền: {formatPrice(total)}</Typography>
            </Box>
            {item.orderStatus === 'DELIVERED' && (<Box padding={1} align="right">
                <Button variant="contained" color="primary" style={{ marginRight: '8px' }}>Mua lại</Button>

            </Box>)}
            {item.orderStatus === 'NEW' && (<Box padding={1} align="right">
                <Button variant="contained" color="primary" style={{ marginRight: '8px' }} onClick={() => handelCancelClick(item._id)}>Hủy đơn hàng</Button>

            </Box>)}
            {/* <ModalViewRating open={open} setOpen={setOpen} comment={comment} /> */}
            {/* <ModalCancelOrder open={openCancel} setOpenCancel={setOpenCancel} handleCancelClick={() => handelCancelOrderClick(true)} id={item._id} /> */}
        </Box >

    );
}

export default Order;