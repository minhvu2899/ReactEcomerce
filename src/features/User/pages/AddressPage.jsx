import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import addressApi from 'api/addressApi';
import LoadingLinear from 'components/LoadingLinear';
import useHttp from 'hooks/use-http';
import React, { useEffect, useState } from 'react';
import Address from '../components/Address';
import FormAddress from '../components/FormAddress';
import { makeStyles } from '@mui/styles'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
// let flag = true;

function AddressPage(props) {

    const useStyles = makeStyles(theme => (
        {
            name: {
                color: 'gray',
            },

            row: {
                padding: '8px',
                borderBottom: '1px solid #ccc'
            },
            root: {
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            },
            label: {
                textTransform: 'capitalize',
            },
            right: {
                padding: '8px'
            },
            close: {
                position: 'absolute',
                right: '8px',
                top: '8px',
                color: 'gray',

                zIndex: '10',
            },
        }
    ))
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const [formEdit, setFormEdit] = React.useState(null);
    const [addressList, setAddressList] = React.useState([]);
    const { _id } = useSelector(state => state.user.current)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);

    };
    // const { enqueueSnackbar } = useSnackbar();
    const [address, setAddress] = useState({});
    const { getAll, update, add, remove } = addressApi;
    const { sendRequest: getAllAddress, status, data: addresses, error } = useHttp(getAll, false)
    const { sendRequest: addAddress, status: statusAdd, error: errorAdd } = useHttp(add, false)
    const { sendRequest: updateAddress, status: statusUpdate, error: errorUpdate } = useHttp(update, false)
    const { sendRequest: removeAddress, status: statusRemove, error: errorRemove } = useHttp(remove, false)


    useEffect(() => {

        if (status === 'completed' && !errorAdd) {
            // enqueueSnackbar("Get Thành công", { variant: "success" })
            setAddressList(addresses)
        }
        if (status === 'completed' && errorAdd) {
            // enqueueSnackbar(errorAdd, { variant: "error" })
        }
    }, [status, errorAdd, addresses])

    useEffect(() => {

        if (statusAdd === 'completed' && !errorAdd) {
            // enqueueSnackbar("", { variant: "success" })
            toast.success('Thêm địa chỉ thành công')

            setOpen(false);

        }
        if (statusAdd === 'completed' && errorAdd) {
            toast.error(errorAdd)
            // enqueueSnackbar(errorAdd, { variant: "error" })
        }
    }, [statusAdd, errorAdd])
    useEffect(() => {

        if (statusUpdate === 'completed' && !errorUpdate) {
            toast.success('Cập nhật địa chỉ thành công')
            setOpen(false);

        }
        if (statusUpdate === 'completed' && errorUpdate) {
            toast.error(errorUpdate)
        }
    }, [statusUpdate, errorUpdate])


    useEffect(() => {
        if (statusUpdate === 'completed' || statusAdd === 'completed' || statusRemove === 'completed') {
            getAllAddress()
        }
    }, [getAllAddress, statusUpdate, statusAdd, statusRemove])
    useEffect(() => {

        getAllAddress()

    }, [getAllAddress])
    useEffect(() => {
        if (statusRemove === 'completed' && !errorRemove) {
            toast.success('Xóa địa chỉ thành công')
        }
        if (statusRemove === 'completed' && errorRemove) {
            toast.error(errorRemove)
        }

    }, [statusRemove, errorRemove])
    const handleSubmit = (values) => {

        // setOpen(true);
        if (!formEdit) {
            addAddress({ ...values, user: _id })
        }
        else {
            updateAddress({ id: address.id, ...values })
        }
    }
    const handelAddClick = () => {
        setOpen(true)
        setFormEdit(false);
        // updateAddress({ id, ...values })
    }
    const handelEditClick = (address) => {

        setOpen(true)
        setFormEdit(true);
        setAddress(address)
    }
    const handelRemoveClick = (id) => {

        removeAddress(id)
    }


    return (
        <>
            <Paper elevation={1}>

                <Grid item container className={classes.row}>
                    <Grid item xs={6} align="left">
                        <Box padding={1}>
                            <Typography variant="h4">Địa chỉ của tôi</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} align="right">
                        <Box padding={1}>
                            <Button classes={{
                                root: classes.root, // class name, e.g. `classes-nesting-root-x`
                                label: classes.label, // class name, e.g. `classes-nesting-label-x`
                            }} onClick={handelAddClick}>Thêm địa chỉ mới</Button>
                        </Box>

                    </Grid>

                </Grid>
                {status === 'pending' && <LoadingLinear />}
                {status === 'completed' && error && <p>Có lỗi xảy ra vui lòng thử lại sau</p>}
                {addressList.length > 0 && addressList.map(address => (
                    <Address address={address} key={address.id} onHandelEditClick={handelEditClick} onHandelRemoveClick={handelRemoveClick} />
                ))}
                {addressList.length === 0 && (<Typography variant="h6" sx={{ p: 2 }}>Không có địa chỉ nào</Typography>)
                }


            </Paper>

            <Dialog disableEscapeKeyDown disableEnforceFocus open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
                <IconButton className={classes.close} onClick={handleClose}>
                    <Close />
                </IconButton>
                <DialogTitle>{!formEdit ? 'Thêm địa chỉ mới' : 'Cập nhật địa chỉ'}</DialogTitle>
                <DialogContent>
                    {formEdit && (
                        <FormAddress onSubmit={handleSubmit} edit={formEdit} address={address}

                        />
                    )}
                    {!formEdit && (
                        <FormAddress onSubmit={handleSubmit} edit={formEdit}

                        />
                    )}

                    {(statusAdd === 'pending' || statusUpdate === 'pending') && <LoadingLinear />}


                </DialogContent>
                <DialogActions>


                </DialogActions>
            </Dialog>

        </ >
    );





}

export default AddressPage;