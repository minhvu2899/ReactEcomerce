import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Paper, Typography } from '@mui/material';
import categoryApi from 'api/categoryApi';
import useHttp from 'hooks/use-http';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from "yup";
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
function CreateOrEditCategoryPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const categoryId = params.id;
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([])
    const { update, add, get } = categoryApi;
    const { sendRequest: AddCategory, status: statusAdd, data: Category, error: errorAdd } = useHttp(add, false)
    const { sendRequest: updateCategory, status: statusUpdate, error: errorUpdate } = useHttp(update, true);
    const { sendRequest: getCategory, status: statusGet, data: category, error: errorGet } = useHttp(get, true);

    useEffect(() => {

        if (statusAdd === 'completed' && !errorAdd) {
            toast.success("Thêm danh mục thành công")
            navigate('/admin/category')

        }
        if (statusAdd === 'completed' && errorAdd) {
            toast.error(errorAdd)
        }
    }, [statusAdd, errorAdd])
    useEffect(() => {

        if (statusUpdate === 'completed' && !errorUpdate) {
            toast.success("Thêm danh mục thành công")
            navigate('/admin/category')

        }
        if (statusUpdate === 'completed' && errorUpdate) {
            toast.error(errorUpdate)
        }
    }, [statusUpdate, errorUpdate])



    const classes = useStyles()
    const schema = yup.object().shape({
        name: yup.string().required('Vui lòng nhập tên danh mục'),

        description: yup.string().required('Vui lòng nhập mô tả'),
        // password: yup.string().required('Please enter your password').min(6, 'Please enter at least 6 words'),
    });
    const form = useForm({
        defaultValues: {
            name: '',

            description: '',

        },
        resolver: yupResolver(schema),
    })
    const { setValue } = form
    useEffect(() => {

        if (statusGet === 'completed' && !errorGet) {
            toast.success("Get danh mục thành công")

            setValue('name', category.name)

            setValue('description', category.description)


        }
        if (statusGet === 'completed' && errorGet) {
            toast.error(errorGet)
        }
    }, [statusGet, errorGet, category, setValue])
    useEffect(() => {
        if (categoryId) {
            getCategory(categoryId)
        }
    }, [categoryId, getCategory])
    const submitHandler = async (form) => {


        if (!categoryId) {
            AddCategory(form)
        }

        else {

            updateCategory({
                id: categoryId,
                ...form
            })
        }





    }
    useEffect(() => {
        (async () => {
            try {
                const { data } = await categoryApi.getAll();
                setCategories(data.map(x => (
                    {
                        value: x.id,
                        label: x.name
                    }
                )));
                console.log(data)
            } catch (error) {
                console.log("Fetch data fair:", error);
            }
            setLoading(false);
        })()



    }, []);

    return (
        <Container maxWidth="sm">
            <Paper className={classes.root}>
                <Typography variant="h4">{!categoryId ? 'Thêm danh mục sản phẩm' : 'Cập nhật danh mục sản phẩm'}</Typography>
                <form className="form" onSubmit={form.handleSubmit(submitHandler)}>

                    <InputField name='name' label='Tên danh mục' form={form}></InputField>

                    <InputField name='description' label='Mô tả chi tiết' form={form}></InputField>


                    {/* <InputField name='category' label='Danh mục' form={form}></InputField> */}
                    <Button type="submit" color="primary" variant="contained" style={{ marginBottom: '15px' }}>{!categoryId ? 'Thêm' : 'Cập nhật'}</Button>
                </form >
            </Paper>
        </Container >
    );
}

export default CreateOrEditCategoryPage;