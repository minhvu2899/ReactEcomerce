import { yupResolver } from '@hookform/resolvers/yup';
import { LockOpenOutlined } from '@mui/icons-material';
// import InputField from 'components/InputFiled';
import { Avatar, Box, Grid, LinearProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ButtonCustom from 'components/ButtonCustom';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../components/InputField';

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


function FormPasswordChange({ userInfo, onSubmit, onChageAvatar, avatar }) {

    const classes = useStyles();
    const schema = yup.object().shape({
        // fullname: yup.string().required('Please enter your fullname')
        //     .test('should has at least two words', 'Please enter at least two words', (value) => {
        //         console.log("Value", value);
        //         return value.split(' ').length >= 2;
        //     }),
        // email: yup.string().required('Please enter your email').email('Please enter a valid email address'),


    });
    const form = useForm({
        defaultValues: {
            passwordCurrent: '',
            password: '',
            passwordConfirm: '',


        },
        resolver: yupResolver(schema),
    })

    const handleSubmit = (values) => {
        if (onSubmit) {
            onSubmit(values);

        }
        form.reset();

    }

    const handleImageUpload = async (e) => {

        onChageAvatar(e)
    }
    const { isSubmitting } = form.formState;
    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.process} />}
            <Avatar className={classes.avatar}>
                <LockOpenOutlined></LockOpenOutlined>
            </Avatar>
            <Typography className={classes.title} component="h3" variant='h5'>
                Thay đổi mật khẩu
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item md={6}>
                        <Box sx={{ mb: 2 }}>
                            <InputField name='passwordCurrent' label='Mật khẩu cũ' form={form}></InputField>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <InputField name='password' label='Mật khẩu mới' form={form}></InputField>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <InputField name='passwordConfirm' label='Nhập lại mật khẩu mới' form={form}></InputField>  </Box>
                        <ButtonCustom disabled={isSubmitting} type="submit" variant="contained" color="primary" fullWidth className={classes.submit}>
                            Đổi mật khẩu
                        </ButtonCustom>
                    </Grid>

                </Grid>



            </form>
        </div>

    );
}

export default FormPasswordChange;