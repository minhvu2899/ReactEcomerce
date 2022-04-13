import { Box, Button, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(theme => ({
    root: {
        padding: '16px',
        borderTop: `1px solid #fff`,
        textAlign: 'left'
    },
    range: {
        marginTop: '8px',
        marginBottom: '8px',
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        '& > span': {
            marginLeft: '8px',
            marginRight: '8px',

        }
    },
    title: {
        padding: '8px',
        borderBottom: '3px solid #e97b59',
        marginBottom: '16px'
    },
}))


FilteByPrice.propTypes = {
    onChange: PropTypes.func,
};


function FilteByPrice({ onChange }) {
    const classes = useStyles();
    const [price, setPrice] = useState(
        [0, 0]
    )
    const handleChange = (e) => {
        const { name, value } = e.target

        setPrice(prevValues => {
            if (e.target.name === 'price:gte') {
                return [e.target.value, prevValues[1]]
            }
            if (e.target.name === 'price:lte') {
                return [prevValues[0], e.target.value]
            }

        })
    }
    const handleSubmit = () => {

        if (onChange) onChange({ price: price.join(',') });
        setPrice(
            [0, 0]
        )

    }
    return (
        <Box className={classes.root}>
            <Typography variant="h6" className={classes.title}>CHỌN KHOẢNG GIÁ</Typography>
            <Box className={classes.range}>
                <TextField name="price:gte" onChange={handleChange} value={price[0]} />
                <span>-</span>
                <TextField name="price:lte" onChange={handleChange} value={price[1]} />
            </Box>
            <Button variant="outlined" color="primary" onClick={handleSubmit} size="small">Áp dụng</Button>
        </Box>
    );
}

export default FilteByPrice;