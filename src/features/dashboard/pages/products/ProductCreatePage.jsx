import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import categoryApi from 'api/categoryApi';
import subcategoryApi from 'api/subcategoryApi';
// import { createProduct, updateProduct } from 'features/Product/productSlice';
import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import FormProductDetail from './FormProductDetail';
import FormProductInfoDeliver from './FormProductInfoDeliver';
import FormProductInformation from './FormProductInformation';
import useHttp from 'hooks/use-http';



function ProductCreatePage(props) {
    const history = useNavigate();
    const match = useParams();
    const productID = match.params.id;
    const dispatch = useDispatch();
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: '8px',
            width: '100%',
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const schema = yup.object().shape({
        // email: yup.string().required('Please enter your email').email('Please enter a valid email address'),
        // password: yup.string().required('Please enter your password').min(6, 'Please enter at least 6 words'),
    });
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const { getAll } = categoryApi;

    const { sendRequest: getAllCategory, status: statusGet, data: listCategories, error: errorGet } = useHttp(getAll, false)
    useEffect(() => {
        getAllCategory()
        // (async () => {
        //     try {
        //         const { data: category } = await categoryApi.getAll();
        //         const { data: subcategory } = await subcategoryApi.getAll();
        //         setCategories(category.map(x => (
        //             {
        //                 value: x.id,
        //                 label: x.name
        //             }
        //         )));
        //         setSubCategories(subcategory.map(x => (
        //             {
        //                 value: x.id,
        //                 label: x.name
        //             }
        //         )))

        //     } catch (error) {
        //         console.log("Fetch data fair:", error);
        //     }
        //     setLoading(false);
        // })()



    }, [getAllCategory]);

    const form = useForm({
        defaultValues: {
            name: '',
            originalPrice: '',
            discountPercent: '',
            image: '',
            short_description: '',
            full_description: '',
            category: '',
            subcategory: '',

        },
        resolver: yupResolver(schema),
    })
    const submitHandler = async (form) => {
        console.log(form)

        if (productID) {
            const product = {
                id: productID,
                ...form,
            }
            // dispatch(updateProduct(product))
        }
        else {
            // dispatch(createProduct(form))
        }
        if (loading) {
            // enqueueSnackbar("Cập nhật thành công", { variant: "success" });
        }
        // history.push({ pathname: '/order/payment' })
        // console.log(history)
    }
    // const handelUploadImage = (e) => {
    //     console.log(e)
    //     const formData = new FormData()
    //     formData.append('file', e.target.files[0])
    //     // // console.log(formData)
    //     uploadImage(formData)
    // }

    return (
        <Container maxWidth="md">
            <form className="form" onSubmit={form.handleSubmit(submitHandler)}>

                <FormProductInformation form={form} categories={categories} subcategories={subCategories} />



                <FormProductDetail form={form} />
                <FormProductInfoDeliver form={form} />

                <Button type="submit" color="primary" variant="contained" style={{ marginBottom: '15px' }}>Thêm</Button>


            </form >
        </Container >
    );
}

export default ProductCreatePage;