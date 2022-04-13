import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Paper, Typography } from '@mui/material';
import { FormInputDropdown } from 'components/SelectField';
import useHttp from 'hooks/use-http';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import userApi from '../../../../api/userApi';
import InputField from './../../../../components/InputField/index';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    formControl: {
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
function UserCreateOrEditPage(props) {
    const history = useNavigate();
    const params = useParams();
    const subCategoryId = params.id;
    const { updateUser, add, get } = userApi;
    const { sendRequest: AddUser, status: statusAdd, data: SubCategory, error: errorAdd } = useHttp(add, false)
    const { sendRequest: update, status: statusUpdate, error: errorUpdate } = useHttp(updateUser, true);
    const { sendRequest: getUser, status: statusGet, data: user, error: errorGet } = useHttp(get, true);
    useEffect(() => {

        if (statusAdd === 'completed' && !errorAdd) {
            // enqueueSnackbar("Thêm danh mục thành công", { variant: "success" })
            history.push('/admin/users')

        }
        if (statusAdd === 'completed' && errorAdd) {
            // enqueueSnackbar(errorAdd, { variant: "error" })
        }
    }, [statusAdd, errorAdd, history])
    useEffect(() => {

        if (statusUpdate === 'completed' && !errorUpdate) {
            // enqueueSnackbar("Cập nhật danh mục thành công", { variant: "success" })
            history('/admin/users')

        }
        if (statusUpdate === 'completed' && errorUpdate) {
            // enqueueSnackbar(errorUpdate, { variant: "error" })
        }
    }, [statusUpdate, errorUpdate, history])



    const classes = useStyles()
    const schema = yup.object().shape({
        name: yup.string().required('Vui lòng nhập tên '),

        email: yup.string().required('Vui lòng nhập email'),
        // role: yup.string().required('Vui lòng chọn danh mục'),
    });
    const form = useForm({
        defaultValues: {
            name: '',
            password: '',
            email: '',
            role: 'admin'
        },
        resolver: yupResolver(schema),
    })
    const { setValue } = form
    useEffect(() => {

        if (statusGet === 'completed' && !errorGet) {
            // enqueueSnackbar("Get danh mục thành công", { variant: "success" })
            console.log(user)
            setValue('first_name', user.first_name)
            setValue('last_name', user.last_name)
            setValue('email', user.email)
            setValue('role', user.role.id)

        }
        if (statusGet === 'completed' && errorGet) {
            // enqueueSna / ckbar(errorGet, { variant: "error" })
        }
    }, [statusGet, errorGet, user, setValue])
    useEffect(() => {
        if (subCategoryId) {
            getUser(subCategoryId)
        }
    }, [subCategoryId, getUser])
    const submitHandler = async (form) => {
        console.log(form)

        if (!subCategoryId) {
            AddUser(form)
        }

        else {

            update({
                id: subCategoryId,
                ...form
            })
        }




        console.log(history)
    }


    return (
        <Container maxWidth="sm">
            <Paper className={classes.root}>
                <Typography variant="h4">{!subCategoryId ? 'Thêm nhân viên' : 'Cập nhật người dùng'}</Typography>
                <form className="form" onSubmit={form.handleSubmit(submitHandler)}>

                    <InputField name='name' label='Tên nhân viên' form={form}></InputField>

                    <InputField name='email' label='Email' form={form}></InputField>
                    <InputField name='password' label='Mật khẩu' form={form}></InputField>

                    {/* <FormInputDropdown name="role" label="Vai trò" form={form}  /> */}


                    {/* <InputField name='category' label='Danh mục' form={form}></InputField> */}
                    <Button type="submit" color="primary" variant="contained" style={{ marginBottom: '15px' }}>{!subCategoryId ? 'Thêm' : 'Cập nhật'}</Button>
                </form >
            </Paper>
        </Container >
    );
}

export default UserCreateOrEditPage;