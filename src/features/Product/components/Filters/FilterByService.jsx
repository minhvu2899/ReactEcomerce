import { Box, Button, FormControlLabel, Typography, Checkbox } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(theme => ({
    root: {
        padding: '16px',
        borderTop: `1px solid #fff`,
        textAlign: 'left'
    },
    list: {
        margin: 0,
        padding: 0,
        marginTop: '8px',
        marginBottom: '8px',
        listStyleType: 'none',

        '& > li': {
            margin: 0,
            padding: 0,
            marginTop: '8px',


        }
    },
    title: {
        padding: '8px',
        borderBottom: '3px solid #e97b59',
        marginBottom: '16px'
    },
}))


FilterByService.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,
};


function FilterByService({ filters = {}, onChange }) {
    const classes = useStyles();

    const handleChange = (e) => {
        if (!onChange) return;
        const { name, checked } = e.target
        onChange({ [name]: checked })
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h6" className={classes.title}>DỊCH VỤ</Typography>
            <ul className={classes.list}>
                {[{ value: "isPromotion", label: "Khuyến mại" }, { value: "isFreeShip", label: "Miễn phí ship" }].map(service => (
                    <li key={service.value}>
                        <FormControlLabel
                            control={<Checkbox checked={Boolean(filters[service.value])} onChange={handleChange} name={service.value} />}
                            label={service.label}
                        />
                    </li>
                ))}
            </ul>

        </Box>
    );
}

export default FilterByService;