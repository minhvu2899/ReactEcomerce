import { Button, Divider, Grid, Typography, Avatar } from '@mui/material';
import { THUMBNAIL_PLACEHOLDER, STATIC_HOST } from 'constants/index';
import { makeStyles } from '@mui/styles'
import React from 'react';
import { formatPrice } from 'utils';
import Box from '@mui/material/Box';
const useStyles = makeStyles(theme => ({
    root: {

    },

    quantity: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    number: {
        padding: '8px 10px',
        width: '40px',
        height: '40px',
        border: '1px solid #ccc',
        borderRadius: '50%',
    },
    item: {
        borderBottom: '1px solid #ccc',
        width: '80%'
    }


}));


function OrderItem({ item }) {
    const classes = useStyles();

    // const thumbnailUrl = item.image ? `${STATIC_HOST}/products/${item.image}` : THUMBNAIL_PLACEHOLDER;
    const thumbnailUrl = item.image ?? THUMBNAIL_PLACEHOLDER;

    return (
        <>
            <Grid container item>
                <Grid item md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            alt={item.name}
                            src={thumbnailUrl}
                            sx={{ width: 60, height: 60, }}
                            variant="rounded"
                        />

                        <Typography variant="subtitle1" noWrap>{item.product_name}</Typography>
                    </Box>

                </Grid>

                <Grid item md={2} align="right">

                    <Box fontWeight="bold" fontSize="15px" color="secondary">
                        {formatPrice(item.price)}
                    </Box>
                </Grid>
                <Grid item md={3} align="center">

                    <Box fontWeight="bold" fontSize="15px" color="secondary">
                        {item.quantity}
                    </Box>
                </Grid>
                <Grid item md={3} align="right">
                    <Box fontWeight="bold" fontSize="15px" color="secondary">
                        {formatPrice(item.price * item.quantity)}
                    </Box>
                </Grid>



            </Grid >


        </>
    );
}

export default OrderItem;