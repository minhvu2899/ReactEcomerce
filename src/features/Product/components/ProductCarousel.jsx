import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { STATIC_HOST } from 'constants/index';
const ProductCarousel = ({ image, images }) => {
    return (
        <Paper sx={{ height: '100%' }}>
            <Carousel showArrows>
                <Box sx={{ width: '100%', height: '300px' }} key={image}>
                    <img src={image.url} alt={image} />
                </Box >
                {images.map(image => (
                    <Box sx={{ width: '100%', height: '300px' }} key={image.public_id}>
                        <img src={image.url} alt={image} />
                    </Box>
                ))}

                {/* <Box width="100%" height="100%">
            <img src={`https://picsum.photos/700/400?img=1`} alt={product.name} />
        </Box > */}

            </Carousel></Paper>
    )
}

export default ProductCarousel