import React from 'react'
import { Dialog, Avatar } from '@mui/material';
import { Close } from '@mui/icons-material';
import { DialogContent } from '@mui/material';
import { TextField } from '@mui/material';
import HoverRating from './../components/Rating';
import LoadingLinear from 'components/LoadingLinear';
import { makeStyles } from '@mui/styles'
import { Container, Paper, Grid, IconButton, Button, DialogTitle, Typography, Box } from '@mui/material';
import { useState, useRef } from 'react';
import { STATIC_HOST } from 'constants/index';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'relative',
        backgroundColor: 'gray',
    },
    menuButton: {

        marginRight: '16px',
    },
    title: {
        flexGrow: 1,
        display: 'inherit'
    },

    close: {
        position: 'absolute',
        right: '8px',
        top: '8px',
        color: 'gray',

        zIndex: '10',
    },
    button: {
        position: 'relative',
    },

}));
const ModelRating = ({ itemRating, isLoading, onSubmit, open, setOpen }) => {

    const [rate, setRate] = useState(0);
    const commentRef = useRef('')
    const classes = useStyles();
    const handleClose = () => {
        setOpen(false);

    };
    const handelActiveStar = (value) => {

        setRate(value)
    }
    const submitHandler = (e) => {

        e.preventDefault()
        onSubmit({ rating: rate, review: commentRef.current.value })
    }
    return (
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth="true">
            <IconButton className={classes.close} onClick={handleClose}>
                <Close />
            </IconButton>
            <DialogTitle>Đánh giá sản phẩm</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex' }}>
                    <Avatar
                        alt={itemRating.product_name}
                        src={`${STATIC_HOST}/products/${itemRating.image}`}
                        sx={{ width: 100, height: 100, mr: 1, mb: 2 }}
                        variant="rounded"
                    />

                    <Typography>{itemRating.product_name}</Typography>
                </Box>
                <form onSubmit={submitHandler}>
                    <HoverRating onHandelActiveStar={handelActiveStar} />
                    <Box padding={1}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Nội dụng đánh giá"
                            multiline
                            rows={4}
                            defaultValue="Sản phẩm tốt"
                            fullWidth
                            inputRef={commentRef}
                        />
                    </Box>
                    <Button type="submit" autoFocus>
                        Xác nhận
                    </Button>
                    {isLoading === 'pending' && <LoadingLinear />}

                </form>

                {/* <FormRating itemRating={itemRating} /> */}


            </DialogContent>

        </Dialog>
    )
}

export default ModelRating