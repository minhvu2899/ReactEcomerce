import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../components/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// import InputField from 'components/InputFiled';
import { Button, Grid, LinearProgress, Typography, Box } from '@mui/material';
import { LockOpenOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles'
import { STATIC_HOST_PRODUCTION } from 'constants/index';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import ButtonCustom from 'components/ButtonCustom';
const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        paddingTop: '48px',
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: 'gray',
    },
    title: {
        margin: '16px 0 24px 0',
        textAlign: 'center',
    },
    button: {
        display: 'inherit',
        textAlign: 'left',
        padding: '8px'
    },
    submit: {
        margin: '24px 0 16px 0',
    },
    process: {
        position: 'absolute',
        top: '8px',
        left: '0',
        right: '0',
    }
}))
FormProfile.propTypes = {
    onSubmit: PropTypes.func,
};

function FormProfile({ userInfo, onSubmit, onUpload }) {
    const classes = useStyles();
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
            name: '',
            photo: '',
            email: '',
            phone: '',

        },
        resolver: yupResolver(schema),
    })
    const { setValue } = form;
    useEffect(() => {
        setValue('name', userInfo.name)
        setValue('email', userInfo.email)
        setValue('phone', userInfo.phone)
        setValue('photo', userInfo.photo)
    }, [userInfo, setValue])
    const handleSubmit = (values) => {
        if (onSubmit) {
            onSubmit(values);

        }
        form.reset();

    }
    // useEffect(() => {
    //     return () => {
    //         avatar && URL.revokeObjectURL(avatar)
    //     }
    // }, [avatar])
    // const handleImageUpload = (e) => {
    //     console.log(e)
    //     const file = e.target.files[0];
    //     setValue('photo', file)
    //     const avatar = URL.createObjectURL(file);
    //     setAvatar(avatar);
    // }
    const handleImageChange = (e) => {
        console.log(e)
        const file = e.target.files[0];
        onUpload(file)
        // setValue('photo', file)
        // const avatar = URL.createObjectURL(file);
        // setAvatar(avatar);
    }
    const { isSubmitting } = form.formState;
    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.process} />}
            <Avatar className={classes.avatar}>
                <LockOpenOutlined></LockOpenOutlined>
            </Avatar>
            <Typography className={classes.title} component="h3" variant='h5'>
                Thông tin của tôi
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Grid container spacing={2}>
                    <Grid item md={8}>
                        <Box sx={{ mb: 1 }}>
                            <InputField name='name' label='Họ' form={form}></InputField>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <InputField name='phone' label='Số điện thoại' form={form}></InputField>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <InputField name='email' label='Email' form={form}></InputField>  </Box>
                        <ButtonCustom disabled={isSubmitting} type="submit" variant="contained" color="primary" fullWidth className={classes.submit}>
                            Cập nhật thông tin
                        </ButtonCustom>
                    </Grid>
                    <Grid item md={4}>
                        <Typography variant="h6" align="left">Ảnh đại diện</Typography>
                        <Box align="left" padding={1} border >
                            {/* {avatar && (
                                <img src={`${STATIC_HOST}/users/${userInfo.photo}`} style={{
                                    width: '120px', height: '80px', objectFit: 'cover'
                                }} alt="User" />
                            )} */}



                            {userInfo.photo ? (
                                <Avatar
                                    alt={userInfo.name}
                                    src={userInfo.photo}
                                    sx={{ width: 100, height: 100 }}
                                    variant="rounded"
                                />


                            ) : (
                                <Avatar
                                    alt={userInfo.name}
                                    src={`${STATIC_HOST_PRODUCTION}/users/default_nxbvp8.jpg`}
                                    sx={{ width: 100, height: 100 }}
                                    variant="rounded"
                                />

                            )}

                        </Box>
                        {/* <FileInput control={form} name="file" onChange={handleImageUpload} /> */}
                        <Box align="left">
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="uploadAvatar"

                                type="file"
                                {...form.register('photo')}
                                onChange={handleImageChange}
                            />
                            <label htmlFor="uploadAvatar" className={classes.button}>
                                <ButtonCustom variant="contained" color="primary" component="span">
                                    Thay đổi
                                </ButtonCustom>

                            </label>

                        </Box>

                    </Grid>
                </Grid>



            </form>
        </div>

    );
}

export default FormProfile;