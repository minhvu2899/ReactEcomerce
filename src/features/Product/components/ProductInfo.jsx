import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddToCartForm from './AddToCartForm';
import { formatPrice } from 'utils';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import ProductDescription from './ProductDescription';
export default function ProductInfo({ onSubmit, product }) {
    return (
        <Card variant="outlined" sx={{ height: '100%', minWidth: 275 }} >
            <CardContent sx={{ textAlign: 'left' }}>
                <Typography sx={{ fontSize: 14, textAlign: 'left' }} color="text.secondary" gutterBottom>

                    Thương hiệu: OEM
                </Typography>
                <Typography variant="h5" component="div">
                    {product.name}
                </Typography>
                <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    sx={{ my: 2 }}
                >
                    <Box><Rating name="read-only" value={product.ratingsAverage} readOnly /></Box>
                    <Box>{`${product.ratingsQuantity} đánh giá`}</Box>
                    <Box>{`Đã bán ${product.sold}`}</Box>
                </Stack>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1.5, mt: 1.5, }}>

                    <Typography sx={{ fontSize: 32, fontWeight: 'bold' }} color="text.primary">
                        {formatPrice(product.priceSale)}
                    </Typography>
                    <Box color="text.secondary" component="span" sx={{ textDecoration: 'line-through', ml: 2, fontSize: 20 }}>{`${formatPrice(product.priceOriginal)}`}</Box>
                    <Box color="text.secondary" component="span" sx={{ ml: 2, fontSize: 20, borderRadius: 1, borderColor: 'error.main', color: 'error.main', display: 'inline-block', border: '1px solid' }}>{`-${product.discountPercent}% `}</Box>
                </Box>
                {/* <Typography variant="body2">
                        <ProductDescription description={product.description} />
                    </Typography> */}
                <AddToCartForm onSubmit={onSubmit} />
            </CardContent>
            <CardActions>
                <Button size="small">Yêu thích</Button>
            </CardActions>
        </ Card>



    );
}
