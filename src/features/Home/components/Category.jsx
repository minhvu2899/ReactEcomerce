import { Box, Card, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material';
import categoryApi from 'api/categoryApi';
import { STATIC_HOST } from 'constants/index';
import useHttp from 'hooks/use-http';
import React, { useEffect } from 'react';
const Category = () => {
    const { getAll } = categoryApi;
    const { sendRequest, status, data, error } = useHttp(getAll, true);
    useEffect(() => {
        sendRequest()
    }, [sendRequest])
    return (
        <Box sx={{ my: 3, px: 1 }}>
            <Paper sx={{ p: 2 }}>
                <Typography variant="h6" color="text.secondary" align="left" >Danh mục</Typography>
            </Paper>

            <Grid container alignItems="stretch">
                {/* {status === 'completed' && !error && data.length > 0 && data.map(c => ( */}
                {status === 'completed' && !error && data.length > 0 && Array.from(new Array(8)).map((c, idx) => (
                    <Grid item md={12 / 8} key={idx}>
                        {/* <Paper>
                        <Box sx={{ p: 2, m: 1 }}>

                            <Link to={`/product?category=${c._id}`} >{c.name}</Link>

                        </Box >
                    </Paper> */}

                        <Card sx={{ maxWidth: '100%', cursor: 'pointer', borderRadius: 0 }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="65"
                                image={`${STATIC_HOST}/category/1.png`}
                                // image={item.imageCover}
                                sx={{ pt: 2 }}
                            />
                            <CardContent>
                                <Typography variant="subtitle" component="div">
                                    {/* {c.name} */}
                                    Thiết bị điện tử
                                </Typography>

                            </CardContent>
                        </Card>

                    </Grid>
                ))
                }

            </Grid ></Box >
    )
}

export default Category