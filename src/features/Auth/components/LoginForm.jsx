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
function LoginForm({ onSubmit }) {
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
                        <Link to="/auth/forgot-password">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>

                        <Button color="primary" onClick={handelClickSignup}>

                            Chưa có tài khoản? Đăng kí ngay

                        </Button>
                    </Grid>
                </Grid>

            </form>
        </>
    );
}

export default LoginForm;