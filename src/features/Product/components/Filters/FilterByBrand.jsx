import { Box, Button, FormControlLabel, Typography, Checkbox } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        textAlign: 'left'
    },
    list: {
        margin: 0,
        padding: 0,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        listStyleType: 'none',

        '& > li': {
            margin: 0,
            padding: 0,
            marginTop: theme.spacing(1),


        }
    },
    title: {
        padding: theme.spacing(1),
        borderBottom: '3px solid #e97b59',
        marginBottom: '16px'
    },
}))


FilterByBrand.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,
};


function FilterByBrand({ filters = {}, onChange, brands }) {
    const classes = useStyles();

    const handleChange = (e) => {
        if (!onChange) return;
        // const { name, checked } = e.target
        onChange(e)
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h6" className={classes.title}>THƯƠNG HIỆU</Typography>
            <ul className={classes.list}>
                {brands.map(brand => (
                    <li key={brand.id}>
                        <FormControlLabel
                            control={<Checkbox checked={Boolean(filters['brand_id'] === brand.id)} onChange={() => handleChange(brand)} name={brand.name} />}
                            label={brand.name}
                        />
                    </li>
                ))}
            </ul>

        </Box>
    );
}

export default FilterByBrand;