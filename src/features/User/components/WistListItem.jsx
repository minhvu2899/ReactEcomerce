import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Avatar, Typography, IconButton } from '@mui/material';
import { formatPrice } from 'utils';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

WistListItem.propTypes = {

};

function WistListItem({ item, removeItem }) {
    const handelRemoveItem = (id) => {
        removeItem(id)
    }
    const history = useNavigate()
    const handelClick = () => {
        history.push(`/products/${item.product.id}`)
    }
    return (
        <>
            <Grid item container align="left" style={{ paddingTop: '20px' }}>
                <Grid item xs={6} style={{ cursor: 'pointer' }} onClick={handelClick}>
                    <Box style={{ display: 'flex' }}>

                        <Avatar alt="Remy Sharp" src={`http://localhost:3001/upload/${item.product.image}`} style={{ width: '100px', height: '100px', marginRight: '8px' }} variant="square" size="large" />
                        <Typography>{item.product.name}</Typography>
                    </Box>





                </Grid>
                <Grid item xs={3} align="center">
                    <Typography>{formatPrice(item.product.salePrice)}</Typography>
                </Grid>
                <Grid item xs={3} align="center">
                    <IconButton size="medium" color="secondary" onClick={() => handelRemoveItem(item.id)}>
                        <DeleteIcon></DeleteIcon>
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
}

export default WistListItem;