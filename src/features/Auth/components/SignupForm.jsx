import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../components/InputField';
import PasswordField from 'components/PasswordField';
import ButtonCustom from 'components/ButtonCustom';
import {
    Link, useNavigate
} from "react-router-dom";
import LoadingLinear from 'components/LoadingLinear';
function SignupForm({ onSubmit, loading }) {
    const navigate = useNavigate();
    const schema = yup.object().shape({

        name: yup.string().required('Vui lòng nhập tên'),
        email: yup.string().required('Vui lòng nhập email').email('Vui lòng nhập email hợp lệ'),
        password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Vui lòng nhập ít nhất 6 kí tự'),
        passwordConfirm: yup.string().required('Vui lòng nhập lại mật khẩu').oneOf([yup.ref('password')], 'Không khớp!')



    });
    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        resolver: yupResolver(schema),

    })

    const handleSubmit = (values) => {

        console.log(values)
        if (onSubmit) {
            onSubmit(values);

        }


    }
    const handelClickSignin = () => {
        navigate("/auth/login");
    }
    return (
        <>

            <form onSubmit={form.handleSubmit(handleSubmit)} sx={{ mt: 1 }} >
                <Box sx={{ mb: 3 }}>
                    <InputField form={form} name="name" label="Họ và tên" />
                </Box>

                <Box sx={{ mb: 3 }}>
                    <InputField form={form} name="email" label="Email" />
                </Box>
                <Box sx={{ mb: 3 }}>
                    <PasswordField form={form} name="password" label="Mật khẩu" />
                </Box>

                <PasswordField form={form} name="passwordConfirm" label="Nhập lại mật khẩu" />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <ButtonCustom
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Đăng kí
                </ButtonCustom>
                <Grid container>
                    <Grid item xs>
                        <Link to="auth/forgot">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>

                        <ButtonCustom color="primary" onClick={handelClickSignin}>

                            Đã có tài khoản? Đăng nhập ngay

                        </ButtonCustom>
                    </Grid>
                </Grid>
                {loading && <LoadingLinear />}
            </form>
        </>
    );
}

export default SignupForm;