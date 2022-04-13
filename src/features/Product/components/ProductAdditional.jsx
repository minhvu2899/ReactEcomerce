import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Typography, Box, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

ProductAdditional.propTypes = {

};
const useStyles = makeStyles(theme => (
    {
        name: {
            color: '#243547',
            backgroundColor: '#efefef',
            marginRight: '10px',
            padding: '8px'
        },
        value: {
            padding: '8px',

            '&:nth-of-type(odd)': {
                backgroundColor: '#fafafa',
                color: '#243547',

            },
        }
    }
))
function ProductAdditional({ product }) {
    const classes = useStyles()
    return (
        <Paper sx={{ m: 4, p: 1 }}>
            <Typography variant="h6" align="left">Thông tin chi tiết</Typography>
            <Grid container>
                {/* {product.length > 0 && product.map(p => ( */}
                {/* <Grid item container>
                        <Grid item xs={2} align="left">
                            <Box padding={1} width="100%">
                                <Typography variant="subtitle1" className={classes.name}>{p.attribute_name}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={10} align="left">
                            <Box padding={1} width="100%">
                                <Typography variant="subtitle1">{p.value}</Typography>
                            </Box>
                        </Grid>
                    </Grid > * /}
    {/* ))} */ }
                <Grid item container>
                    <Grid item xs={2} align="left">

                        <Typography variant="subtitle1" className={classes.name}>Thương hiệu</Typography>

                    </Grid>
                    <Grid item xs={10} align="left">

                        <Typography variant="subtitle1" className={classes.value}>Minh</Typography>

                    </Grid>
                </Grid>
            </Grid >
        </Paper >
    );
}

export default ProductAdditional;

