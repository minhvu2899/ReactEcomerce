import { Box, Button, FormControlLabel, Typography, Checkbox } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
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
    rating: {
        cursor: 'pointer',
    }
}))


FilterByRating.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,
};

const rating = [
    { id: 5, rate: 5 },
    { id: 4, rate: 4 },
    { id: 3, rate: 3 },
    { id: 2, rate: 2 },
    { id: 1, rate: 1 },
]
function FilterByRating({ filters = {}, onChange }) {
    const classes = useStyles();

    const handleRatingClick = (e) => {
        if (!onChange) return;
        // const { name, checked } = e.target
        onChange(e)
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h6" className={classes.title}>ĐÁNH GIÁ</Typography>
            <ul className={classes.list}>
                {rating.map(r => (
                    <li key={r.id} className={classes.rating} onClick={() => handleRatingClick(r)}>

                        <Box component="fieldset" mb={1} borderColor="transparent">
                            <Rating name="read-only" value={r.rate} readOnly />

                        </Box>
                    </li>
                ))}
            </ul>

        </Box>
    );
}

export default FilterByRating;