import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Close } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
    },
    close: {
        position: 'absolute',
        right: '8px',
        top: '8px',
        color: 'gray',

        zIndex: '10',
    },
}))
function ModalCustom({ title, open, handleClick, onClose, handleDeleteClick, children }) {

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    const classes = useStyles()
    const handleClose = () => {
        onClose()
    };
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={classes.root}
            >
                <IconButton className={classes.close} onClick={handleClose}>
                    <Close />
                </IconButton>
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {children}
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default ModalCustom;