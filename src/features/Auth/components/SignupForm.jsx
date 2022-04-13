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
import {
    Link, useNavigate
} from "react-router-dom";
function SignupForm({ onSubmit }) {
    const navigate = useNavigate();
    const schema = yup.object().shape({

        name: yup.string().required('Please enter your first_name'),
        email: yup.string().required('Please enter your email').email('Please enter a valid email address'),
        password: yup.string().required('Please enter your password').min(6, 'Please enter at least 6 words'),
        passwordConfirm: yup.string().required('Please enter retype password.').oneOf([yup.ref('password')], 'Password does not match!')



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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Đăng nhập
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link to="auth/forgot">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>

                        <Button color="primary" onClick={handelClickSignin}>

                            Đã có tài khoản? Đăng nhập ngay

                        </Button>
                    </Grid>
                </Grid>

            </form>
        </>
    );
}

export default SignupForm;