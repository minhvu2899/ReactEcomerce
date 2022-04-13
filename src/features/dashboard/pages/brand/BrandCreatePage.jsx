import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Button, Box, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/material/styles';
import categoryApi from 'api/categoryApi';
import { createProduct, updateProduct } from 'features/Product/productSlice';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useMatch } from 'react-router-dom';
import * as yup from "yup";
import FormBrandInfo from './FormBrandInfo';
import brandApi from 'api/brandApi';
import useHttp from 'hooks/use-http';
import axiosClient from 'api/axiosClient';
import uploadApi from 'api/uploadApi';
import LoadingLinear from 'components/LoadingLinear';
import Select from 'react-select';

function BrandCreatePage(props) {
    const history = useNavigate();
    const match = useMatch();
    const brandID = match.params.id;
    const dispatch = useDispatch();
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            width: '100%',
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        input: {
            display: 'none'
        },
        logo: {
            width: '100px', height: '100px', objectFit: 'cover'
        }
    }));
    const { enqueueSnackbar } = useSnackbar();
    const schema = yup.object().shape({
        name: yup.string().required('Vui lòng nhập tên danh mục'),
        logo: yup.string().required('Vui lòng chọn logo'),
        slug: yup.string().required('Vui lòng nhập slug'),
        categories: yup.array().required('Vui lòng nhập danh mục'),
    });
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [logo, setLogo] = useState('');
    const { getAll, update, add, remove, get } = brandApi;
    const { sendRequest: createBrand, status: statusAdd, error: errorAdd } = useHttp(add, false)
    const { add: upload } = uploadApi;
    const { sendRequest: uploadImage, status: statusUpload, data: imageUpload, error: errorUpload } = useHttp(upload, false)
    const { sendRequest: updateBrand, status: statusUpdate, error: errorUpdate } = useHttp(update, true);
    const { sendRequest: getBrand, status: statusGet, data: brand, error: errorGet } = useHttp(get, true);
    const form = useForm({
        defaultValues: {
            name: '',
            logo: '',
            slug: '',
            categories: [],


        },
        resolver: yupResolver(schema),
    })
    const { setValue, getValues } = form;
    useEffect(() => {
        if (brandID) {
            getBrand(brandID)
        }
    }, [brandID, getBrand])
    useEffect(() => {

        if (statusUpdate === 'completed' && !errorUpdate) {
            enqueueSnackbar("Cập nhật danh mục thành công", { variant: "success" })
            history.push('/admin/brand')

        }
        if (statusUpdate === 'completed' && errorUpdate) {
            enqueueSnackbar(errorUpdate, { variant: "error" })
        }
    }, [statusUpdate, enqueueSnackbar, errorUpdate, history])
    useEffect(() => {

        if (statusGet === 'completed' && !errorGet) {
            enqueueSnackbar("Get danh mục thành công", { variant: "success" })

            setValue('name', brand.name)
            setValue('slug', brand.slug)
            setValue('logo', brand.logo)
            setValue('categories', brand.categories.map(brand => (
                { value: brand.id, label: brand.name }
            )))
            setLogo(brand.logo)

        }
        if (statusGet === 'completed' && errorGet) {
            enqueueSnackbar(errorGet, { variant: "error" })
        }
    }, [statusGet, enqueueSnackbar, errorGet, brand, setValue])
    useEffect(() => {
        (async () => {
            try {
                const { data: category } = await categoryApi.getAll();
                const newCategory = category.map(x => (
                    {
                        value: x.id,
                        label: x.name
                    }
                ))
                setCategories(newCategory);

            } catch (error) {
                console.log("Fetch data fair:", error);
            }
            setLoading(false);
        })()



    }, []);
    useEffect(() => {

        if (statusAdd === 'completed' && !errorAdd) {
            enqueueSnackbar("Thêm thương hiệu thành công", { variant: "success" })
            history.push('/admin/brand')
        }
        if (statusAdd === 'completed' && errorAdd) {
            enqueueSnackbar(errorAdd, { variant: "error" })
        }
    }, [statusAdd, errorAdd, enqueueSnackbar, history])


    useEffect(() => {

        if (statusUpload === 'completed' && !errorUpload) {
            enqueueSnackbar("Upload thành công", { variant: "success" })
            setValue('logo', imageUpload)
        }
        if (statusUpload === 'completed' && errorUpload) {
            enqueueSnackbar(errorUpload, { variant: "error" })
        }
    }, [statusUpload, errorUpload, enqueueSnackbar, setValue, imageUpload])
    const submitHandler = async (form) => {
        console.log(form)
        const categories = form.categories.map(category => (
            { id: category.value }
        ))
        form.categories = categories
        if (brandID) {
            const brand = {
                id: brandID,
                ...form,
            }
            updateBrand(brand)
        }
        else {
            console.log(form)
            createBrand(form)
        }



        if (loading) {
            enqueueSnackbar("Cập nhật thành công", { variant: "success" });
        }
        // history.push({ pathname: '/order/payment' })
        // console.log(history)
    }
    const handleImageUpload = async (e) => {
        console.log(e)
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        // // console.log(formData)
        uploadImage(formData)
        // const { data } = await axiosClient.post('http://localhost:3001/upload', formData)
        // console.log('dâ', data)
    }
    let urlLogo = ''
    if (logo && statusUpload !== 'completed') {
        urlLogo = `http://localhost:3001/upload/${logo}`
    }
    else if (statusUpload === 'completed') {
        urlLogo = `http://localhost:3001/upload/${imageUpload}`
    }
    else {
        urlLogo = "https://www.lifewire.com/thmb/P856-0hi4lmA2xinYWyaEpRIckw=/1920x1326/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
    }

    return (
        <Container maxWidth="md">
            <form className="form" onSubmit={form.handleSubmit(submitHandler)}>
                <Paper elevation={3}>
                    <Typography variant="h4" align="left">Thông tin cơ bản</Typography>
                    <Container maxWidth="sm">
                        <FormBrandInfo form={form} categories={categories} onUpload={handleImageUpload} ></FormBrandInfo>


                        <Box align="left" padding={1}>

                            <img src={urlLogo} className={classes.logo}

                            />
                        </Box>
                        <Button type="submit" color="primary" variant="contained" style={{ marginBottom: '15px' }}>Cập nhật</Button>

                    </Container>
                </Paper>
            </form >
        </Container >
    );
}

export default BrandCreatePage;