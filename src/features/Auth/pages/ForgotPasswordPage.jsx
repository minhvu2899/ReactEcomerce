import { yupResolver } from '@hookform/resolvers/yup';
import { LockOpenOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Grid, LinearProgress, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../components/InputField';
import userApi from 'api/userApi';
import useHttp from './../../../hooks/use-http';
const ForgotPasswordPage = () => {
    const { forgotPassword } = userApi;
    const { sendRequest, status: status, data, error: error } = useHttp(forgotPassword, false)
    const schema = yup.object().shape({
        // fullname: yup.string().required('Please enter your fullname')
        //     .test('should has at least two words', 'Please enter at least two words', (value) => {
        //         console.log("Value", value);
        //         return value.split(' ').length >= 2;
        //     }),
        email: yup.string().required('Please enter your email').email('Please enter a valid email address'),


    });
    const form = useForm({
        defaultValues: {

            email: '',


        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = (values) => {
        sendRequest(values)
        form.reset();

    }
    if (status === 'completed' && !error) {
        return (
            <Typography component="h3" variant='h5'>
                Đã gửi mã về email. Kiểm tra email để đặt lại mật khẩu
            </Typography>
        )
    }

    const { isSubmitting } = form.formState;
    return (
        <div >
            {isSubmitting && <LinearProgress />}

            <Typography component="h3" variant='h5'>
                Quên mật khẩu? Vui lòng nhập email đã đăng kí tài khoản
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Grid container spacing={2}>
                    <Grid item md={8}>

                        <Box sx={{ mb: 1 }}>
                            <InputField name='email' label='Email' form={form}></InputField>  </Box>
                        <Button disabled={isSubmitting} type="submit" variant="contained" color="primary" fullWidth>
                            Cập nhật thông tin
                        </Button>
                    </Grid>
                </Grid >
            </form>
        </div>);
}

export default ForgotPasswordPage