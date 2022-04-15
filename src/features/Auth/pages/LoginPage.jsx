import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { login } from '../userSlice'
import { toast } from "react-toastify";
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
const theme = createTheme();

export default function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { isLogin } = useSelector(state => state.user)
    const handleSubmit = async ({ email, password }) => {
        try {
            setLoading(true)
            const data = { email, password };
            const resultAction = await dispatch(login(data));

            const user = unwrapResult(resultAction);
            // console.log(user)
            //Close Dialog

            toast.success(
                'Đăng nhập thành công'
            )
            navigate('/')

            // console.log("Fetch:", user);
        } catch (error) {

            console.log("Fail:", (error));
            const message = error.message;
            toast.error(message)
        }
        setLoading(false)
    }
    useEffect(() => {
        if (isLogin) {
            navigate('/')
        }
    }, [isLogin, navigate])
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <LoginForm onSubmit={handleSubmit} loading={loading} />
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
