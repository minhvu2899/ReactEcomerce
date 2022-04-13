import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, Box, Typography } from '@mui/material';
import OrderItem from 'features/Order/components/OrderItem';
import { Paper } from '@mui/material';

const ListItem = ({ items }) => {

    return (
        <Paper sx={{ textAlign: 'left', px: 1, my: 2, py: 2 }}>
            <Typography fontWeight="bold" variant="h6">2. Sản phẩm</Typography>
            <Grid container justifyContent="center"
                alignItems="center">
                <Grid item md={4} textAlign="left" padding={1}>
                    <Typography variant="subtitle1">Sản phẩm</Typography>
                </Grid>
                <Grid item md={2} align="right">
                    <Typography variant="subtitle1">Đơn giá</Typography>
                </Grid>
                <Grid item md={3} align="center">
                    <Typography variant="subtitle1">Số lượng</Typography>
                </Grid>
                <Grid item md={3} textAlign="right">
                    <Typography variant="subtitle1">Thành tiền</Typography>
                </Grid>

            </Grid>
            <Grid container>

                {items.map((item, i) => (
                    <OrderItem item={item} key={i}></OrderItem>
                ))}

            </Grid>
        </Paper>
    )
}

export default ListItem