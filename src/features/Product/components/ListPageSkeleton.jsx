import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Skeleton } from '@mui/material';
ListPageSkeleton.propTypes = {
    length: PropTypes.number,
};
ListPageSkeleton.defaultProps = {
    length: 12
}
function ListPageSkeleton({ length, count }) {
    return (

        <Box >
            <Grid container>
                {Array.from(new Array(length)).map((item, index) => (

                    <Grid item key={index} xs={12} sm={6} md={12 / count}>
                        <Box padding={1} >
                            <Skeleton variant="rect" width="100%" height={215} />
                            <Skeleton width="100%" />
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Skeleton width="30%" />
                                <Skeleton width="30%" />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                                <Skeleton width="30%" />
                                <Skeleton width="30%" />
                            </Box>
                        </Box>
                    </Grid>

                ))}
            </Grid>

        </Box >

    );
}

export default ListPageSkeleton;