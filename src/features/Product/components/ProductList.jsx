import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import ProductCard from './ProductCard';
const ProductList = ({ data, count }) => {

    return (
        <Box sx={{ m: 1 }}>
            <Grid container spacing={2}>

                {data && data.map(product => (
                    <Grid item xs={12} sm={6} md={12 / count} key={product.id}>
                        <ProductCard item={product} />
                    </Grid>
                ))}


            </Grid>
        </Box>
    )
}

export default ProductList