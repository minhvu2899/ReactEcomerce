import React from 'react';
import PropTypes from 'prop-types';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { STATIC_HOST } from 'constants/index';
Slider.propTypes = {

};

function Slider(props) {
    return (
        <Box sx={{ my: 3, px: 1 }}>
            <Grid container>
                <Grid item xs={12}>
                    <Carousel showThumbs={false} autoPlay>
                        <Box width="100%" >
                            <img src={`${STATIC_HOST}/sliders/3.jpg`} alt="slider" />
                        </Box >
                        <Box width="100%" >
                            <img src={`${STATIC_HOST}/sliders/2.jpg`} alt="slider" />
                        </Box >
                        <Box width="100%" >
                            <img src={`${STATIC_HOST}/sliders/1.jpg`} alt="slider" />
                        </Box >

                    </Carousel>    </Grid>

            </Grid></Box>
    );
}

export default Slider;