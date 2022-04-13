import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, LinearProgress, Typography } from '@mui/material';
import userApi from 'api/userApi';
import PasswordField from 'components/PasswordField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from "yup";
import useHttp from './../../../hooks/use-http';
import { useEffect } from 'react';
const ResetPasswordPage = () => {
    const { resetPassWord } = userApi;
    const navigate = useNavigate()
    const { token } = useParams()
    const { sendRequest, status, data, error } = useHttp(resetPassWord, false)
    const schema = yup.object().shape({
        password: yup.string().required('Please enter your password').min(6, 'Please enter at least 6 words'),
        passwordConfirm: yup.string().required('Please enter retype password.').oneOf([yup.ref('password')], 'Password does not match!')


    });
    const form = useForm({
        defaultValues: {

            password: '',
            passwordConfirm: ''


        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = (values) => {
        sendRequest(token, values)
        form.reset();

    }
    useEffect(() => {
        if (status === 'completed' && !error) {
            toast.success('Thay đổi mật khẩu thành công');
            navigate('/auth/login')
        }
        if (status === 'completed' && error) {
            toast.error(error);

        }
    }, [status, error, navigate]);


    const { isSubmitting } = form.formState;
    return (
        <div >
            {isSubmitting && <LinearProgress />}

            <Typography component="h3" variant='h5' sx={{ mb: 3 }}>
                Đặt lại mật khẩu mới
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Grid container spacing={2}>
                    <Grid item md={8}>

                        <Box sx={{ mb: 1 }}>
                            <PasswordField form={form} name="password" label="Mật khẩu mới" />  </Box>
                        <Box sx={{ mb: 1 }}>
                            <PasswordField form={form} name="passwordConfirm" label="Nhập lại mật khẩu" />
                        </Box>

                        <Button disabled={isSubmitting} type="submit" variant="contained" color="primary" fullWidth>
                            Cập nhật thông tin
                        </Button>
                    </Grid>
                </Grid >
            </form>
        </div >);
}

export default ResetPasswordPage