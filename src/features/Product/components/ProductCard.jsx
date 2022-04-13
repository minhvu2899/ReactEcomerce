import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from 'utils';
import { STATIC_HOST } from 'constants/index';

export default function ProductCard({ item }) {
    const navigate = useNavigate()
    return (
        <Card sx={{ maxWidth: '100%', cursor: 'pointer' }} onClick={() => navigate(`/product/${item.slug}`)}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="200"
                // image={`${STATIC_HOST}/products/${item.imageCover}`}
                image={item.imageCover.url}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" noWrap>
                    {item.name}
                </Typography>
                <Typography variant="body2" color="text.primary" fontWeight="bold" >

                    {item.priceOriginal > item.priceSale ? (

                        <>
                            <Box component="span"> {formatPrice(item.priceSale)}</Box>
                            <Box color="text.secondary" component="span" sx={{ textDecoration: 'line-through', ml: 2 }}>{`${formatPrice(item.priceOriginal)}`}</Box>
                        </>


                    ) : (
                        <Box component="span"> {formatPrice(item.priceOriginal)}</Box>
                    )}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button size="small">Mua ngay</Button>
                <Rating name="read-only" value={item.ratingsAverage} readOnly size="small" />
            </CardActions>
        </Card >
    );
}