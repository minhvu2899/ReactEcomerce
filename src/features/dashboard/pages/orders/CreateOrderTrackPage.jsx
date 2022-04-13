import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, Container, Dialog, DialogContent, DialogTitle, IconButton, LinearProgress, Typography } from '@mui/material';
import { Close, LockOpenOutlined } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from 'components/InputField';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(4),
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },
    title: {
        margin: theme.spacing(2, 0, 3, 0),
        textAlign: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2, 0),
    },
    process: {
        position: 'absolute',
        top: theme.spacing(1),
        left: '0',
        right: '0',
    },

    menuButton: {

        marginRight: theme.spacing(2),
    },


    close: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],

        zIndex: '10',
    },
    button: {
        position: 'relative',
    },
}))


function CreateOrderTrackPage({ open, handleChange, onSubmit }) {
    const classes = useStyles()
    const schema = yup.object().shape({

        // email: yup.string().required('Please enter your email').email('Please enter a valid email address'),
        // password: yup.string().required('Please enter your password').min(6, 'Please enter at least 6 words'),


    });
    const form = useForm({
        defaultValues: {

            status: '',
            description: '',

        },
        resolver: yupResolver(schema),
    })

    const handleOnSubmit = (values) => {

        console.log(values)
        if (onSubmit) {
            onSubmit(values);

        }


    }
    const { isSubmitting } = form.formState;
    return (

        < >
            <Dialog disableBackdropClick disableEscapeKeyDown disableEnforceFocus open={open} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth="true">
                <IconButton className={classes.close} onClick={handleChange}>
                    <Close />
                </IconButton>
                <DialogTitle>Đánh giá sản phẩm</DialogTitle>
                <DialogContent>
                    {isSubmitting && <LinearProgress className={classes.process} />}
                    <Avatar className={classes.avatar}>
                        <LockOpenOutlined></LockOpenOutlined>
                    </Avatar>
                    <Typography className={classes.title} component="h3" variant='h5'>
                        Sign In
                    </Typography>
                    <form onSubmit={form.handleSubmit(handleOnSubmit)}>
                        <Controller
                            control={form.control}
                            name="status"
                            defaultValue=''

                            render={(
                                { onChange, value, name }

                            ) => (
                                <FormControl fullWidth>
                                    <InputLabel id="status-select-label">Trạng thái</InputLabel>
                                    <Select
                                        labelId="status-select-label"
                                        id="status-select"
                                        value={value}
                                        label="Trạng thái"
                                        onChange={onChange}
                                    >
                                        <MenuItem value="CONFIRM">Xác nhận đơn hàng</MenuItem>
                                        <MenuItem value="IN_PROGRESS">Đang xử lí</MenuItem>
                                        <MenuItem value="PACKAGED">Đã đóng gói</MenuItem>
                                        <MenuItem value="PICKED">Đã lấy hàng</MenuItem>
                                        <MenuItem value="DELIVERED">Đã giao hàng</MenuItem>
                                        <MenuItem value="PAID">Đã thanh toán</MenuItem>
                                        <MenuItem value="RETURNED">Hoàn trả</MenuItem>
                                        <MenuItem value="DONE">Hoàn thành</MenuItem>

                                    </Select>
                                </FormControl>
                            )}
                        />




                        <InputField value="Minh" name='description' label='Mô tả' form={form}></InputField>


                        <Button disabled={isSubmitting} type="submit" variant="contained" color="primary" fullWidth className={classes.submit}>
                            Thêm
                        </Button>
                    </form>

                    {/* <FormRating itemRating={itemRating} /> */}


                </DialogContent>

            </Dialog>

        </>
    );
}

export default CreateOrderTrackPage;