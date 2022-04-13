import React from 'react'
import { Box, Grid, Card, CardMedia } from '@mui/material';
import { STATIC_HOST } from 'constants/index';

const Banner = () => {
    return (
        <Box sx={{ my: 3, px: 1 }}>

            <Grid container>

                <Grid item md={12}>
                    <Card sx={{ maxWidth: '100%', cursor: 'pointer' }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="111"
                            image={`${STATIC_HOST}/banner/1.png`}
                            // image={item.imageCover}
                            sx={{ pt: 2 }}
                        />
                    </Card>
                </Grid>



            </Grid ></Box >
    )
}

export default Banner