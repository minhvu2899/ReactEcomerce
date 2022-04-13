import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Typography, Chip, Button } from '@mui/material';
import { makeStyles } from '@mui/styles'
ShippingAddress.propTypes = {

};
const useStyles = makeStyles(theme => ({
    row: {
        paddingBottom: '8px',
        borderBottom: '1px solid #ccc'
    },
    root: {

        display: 'inline-flex',
        alignItems: 'center',
    },

    label: {
        textTransform: 'capitalize',
    },
    name: {
        color: 'gray'
    }
}))
function ShippingAddress({ address }) {

    const classes = useStyles();
    return (
        <Box width="100%" className={classes.root}>
            <Typography variant="h6" fontWeight="bold" style={{ marginRight: '8px' }}>{address.name} {address.phone_number} </Typography>
            <Typography variant="subtitle1"> {address.address},   {address.ward},   {address.district}, {address.city}
            </Typography>

        </Box>



    );
}

export default ShippingAddress;