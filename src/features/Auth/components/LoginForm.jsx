import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import ButtonCustom from 'components/ButtonCustom';
import LoadingLinear from 'components/LoadingLinear';
import PasswordField from 'components/PasswordField';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
    Link, useNavigate
} from "react-router-dom";
import * as yup from "yup";
import InputField from '../../../components/InputField';
function LoginForm({ onSubmit, loading }) {
    const navigate = useNavigate();
    const schema = yup.object().shape({

        email: yup.string().required('Vui lòng nhập email').email('Vui lòng nhập email hợp lệ'),
        password: yup.string().required('Mật khẩu không được để trống').min(6, 'Vui lòng nhập mật khẩu có ít nhất 6 kí tự'),


    });
    const form = useForm({
        defaultValues: {

            email: '',
            password: '',

        },
        resolver: yupResolver(schema),

    })

    const handleSubmit = (values) => {


        if (onSubmit) {
            onSubmit(values);

        }


    }
    const handelClickSignup = () => {
        navigate("/auth/signup");
    }
    return (
        <>

            <form onSubmit={form.handleSubmit(handleSubmit)} sx={{ mt: 1 }}>
                <Box sx={{ mb: 3 }}>
                    <InputField form={form} name="email" label="Email" />
                </Box>

                <PasswordField form={form} name="password" label="Password" />
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
                    Đăng nhập
                </ButtonCustom>
                <Grid container>
                    <Grid item xs>
                        <Link to="/auth/forgot-password">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>

                        <ButtonCustom color="primary" onClick={handelClickSignup}>

                            Chưa có tài khoản? Đăng kí ngay

                        </ButtonCustom>
                    </Grid>
                </Grid>
                {loading && <LoadingLinear />}
            </form>
        </>
    );
}

export default LoginForm;