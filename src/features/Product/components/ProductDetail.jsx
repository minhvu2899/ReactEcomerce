import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProductInfo from './ProductInfo';
import ProductCarousel from './ProductCarousel';

export const ProductDetail = ({ onSubmit, product }) => {

    const handelSubmitAddToCart = (values) => {

        onSubmit(values);

    }
    return (
        <Box sx={{ flexGrow: 1, m: { xs: 1, md: 4 } }} >
            <Grid container spacing={2} alignItems="stretch">
                <Grid item xs={12} sm={7} sx={{ p: { md: 3, xs: 0 } }}>
                    <ProductCarousel image={product.imageCover} images={product.images} />
                </Grid>
                <Grid item xs={12} sm={5} sx={{ p: { md: 3, xs: 0 } }}>
                    <ProductInfo onSubmit={handelSubmitAddToCart} product={product} />
                </Grid>

            </Grid>
        </Box >
    )
}
