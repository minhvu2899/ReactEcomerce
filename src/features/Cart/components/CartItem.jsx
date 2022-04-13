import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch } from 'react-redux';
import { formatPrice } from 'utils';
import { removeFromCart } from '../cartSlice';
import UpdateQuantityForm from './UpdateQuantityForm';
const CartItem = ({ item }) => {
    // onClick={() => navigate(`/product/${item.slug}`)}
    const dispatch = useDispatch()
    const handleDeleteItem = (id) => {

        dispatch(removeFromCart(id))
    }
    return (
        <Paper elevation={0}>
            <Grid container justifyContent="center"
                alignItems="center">
                <Grid item xs={4}>
                    <Box sx={{ display: 'flex', p: 1 }}>
                        <Link sx={{ width: '76px', height: '76px' }}>
                            <Card sx={{ maxWidth: '100%', cursor: 'pointer' }} >
                                <CardMedia
                                    component="img"
                                    alt={item.product.name}
                                    height="76"
                                    image={item.product.imageCover.url}
                                />
                            </Card>

                        </Link>

                        <Typography sx={{ width: `calc(100% - 76px)`, ml: 1 }} textAlign="left">{item.product.name}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box>{formatPrice(item.product.priceSale)}</Box>
                </Grid>
                <Grid item md={3}>
                    <UpdateQuantityForm qty={item.quantity} id={item.id} />
                </Grid>
                <Grid item md={2}>
                    <Box>{formatPrice(item.product.priceSale * item.quantity)}</Box>
                </Grid>
                <Grid item md={1}>
                    <Box>
                        <IconButton onClick={() => handleDeleteItem(item._id)}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Paper >
    )
}

export default CartItem