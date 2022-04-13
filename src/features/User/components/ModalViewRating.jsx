import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Divider, Grid, Typography, Button, Dialog, IconButton, DialogTitle, DialogContent, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import { STATIC_HOST } from 'constants/index';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles'
ModalViewRating.propTypes = {

};
const useStyles = makeStyles(theme => ({
    root: {
        cursor: 'pointer',
    },
    link: {
        width: '100%',
        textDecoration: 'none',
        color: 'black',
        display: 'block'
    },

    close: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],

        zIndex: '10',
    },
}))
function ModalViewRating({ comment, open, setOpen }) {
    const classes = useStyles();
    const history = useNavigate()
    const handelOnClick = (id) => {
        history.push(`/products/${id}`)
    }
    return (
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth="true">
            <IconButton className={classes.close} onClick={() => setOpen(false)}>
                <Close />
            </IconButton>
            <DialogTitle>Đánh giá sản phẩm</DialogTitle>
            <DialogContent>
                <Box padding={1} onClick={() => handelOnClick(comment.product.id)} style={{ cursor: 'pointer' }}>
                    <img src={`${STATIC_HOST}/${comment.product?.image}`} width="30%" alt={comment.product?.name} />
                    <Typography>{comment.product?.name}</Typography>
                </Box>

                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating name="read-only" value={comment.rate} readOnly />
                </Box>

                <Box padding={1}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Nội dụng đánh giá"
                        multiline
                        rows={4}
                        defaultValue={comment.comment}
                        fullWidth
                        disabled
                    />
                </Box>






            </DialogContent>

        </Dialog>
    );
}

export default ModalViewRating;