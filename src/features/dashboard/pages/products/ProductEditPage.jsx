import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container } from '@mui/material';
import categoryApi from 'api/categoryApi';
import productApi from 'api/productApi';
import subcategoryApi from 'api/subcategoryApi';
import useHttp from 'hooks/use-http';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from "yup";
// import FormProductDetail from './FormProductDetail';
// import FormProductInfoDeliver from './FormProductInfoDeliver';
import FormProductInformation from './FormProductInformation';
import UploadImage from './UploadImage';


let flag = 1
function ProductEditPage(props) {
    const navigate = useNavigate();
    const params = useParams();
    const productID = params.id;
    const schema = yup.object().shape({
        // name: yup.string().required('Vui lòng nhập tên sản phẩm'),
        // category: yup.string().required('Vui lòng nhập danh mục sản phẩm'),
        // subcategory: yup.string().required('Vui lòng nhập danh mục sản phẩm'),
        // // brand: yup.string().required('Vui lòng nhập thương hiệu sản phẩm'),
        // images: yup.array().required('Vui lòng nhập hình ảnh sản phẩm'),
        // product_cost: yup.number().required('Vui lòng nhập chi phí sản phẩm'),
        // originalPrice: yup.number().required('Vui lòng nhập giá sản phẩm'),
        // countInStock: yup.number().required('Vui lòng nhập số lượng').min(0, 'Vui lòng nhập số lượng lớn hơn 0').typeError('Vui lòng nhập một số'),
        priceDiscount: yup.number().min(0, 'Vui lòng nhập giảm giá sản phẩm').typeError('Vui lòng nhập một số'),
        // product_cost: yup.number().min(0, 'Vui lòng nhập chi phí sản phẩm').typeError('Vui lòng nhập một số'),
        priceOriginal: yup.number().min(0, 'Vui lòng nhập giá sản phẩm').typeError('Vui lòng nhập một số'),
        countInStock: yup.number().min(0, 'Vui lòng nhập giảm giá sản phẩm').typeError('Vui lòng nhập một số'),
        // image: yup.string().required('Vui lòng chọn hình ảnh sản phẩm'),
        // short_description: yup.string().required('Vui lòng nhập mô tả sản phẩm'),
        // full_description: yup.string().required('Vui lòng nhập mô tả sản phẩm'),
        // variants: yup.array().of(
        //     yup.object().shape({
        //         countInStock: yup.number().required('Vui lòng nhập số lượng').min(0, 'Vui lòng nhập số lượng lớn hơn 0').typeError('Vui lòng nhập một số'),
        //         originalPrice: yup.number().required('Vui lòng nhập giá').min(0, 'Vui lòng nhập giá lớn hơn 0').typeError('Vui lòng nhập một số'),

        //     })
        // )
    });
    const form = useForm({
        defaultValues: {
            name: '',
            // product_cost: 0,
            priceOriginal: 100000,
            priceDiscount: 0,
            priceSale: 50000,
            imageCover: '',
            // short_description: '',
            // full_description: '',
            category: '',
            subcategory: '',
            // brand: '',
            images: [],
            // variants: [],
            // attributes: [],
            // width: 0,
            // length: 0,
            // height: 0,
            // weight: 0,
            countInStock: 100,
            isFreeShip: false,
            isPromotion: false,

        },
        resolver: yupResolver(schema),
    })
    // const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState('');
    const [subcategorySelected, setSubCategorySelected] = useState('');
    const [brandSelected, setBrandSelected] = useState('');
    const [full_description, setFullDescription] = useState('');
    const { getAttributes, getAll, get } = categoryApi;
    const [loadingUpload, setLoadingUpload] = useState(false)
    const { get: getProduct, update } = productApi;
    const { getByCategory } = subcategoryApi
    const { sendRequest: getAllCategory, status: statusGet, data: categories, error: errorGet } = useHttp(getAll, true)
    const { sendRequest: updateProduct, status: statusUpdate, data: products, error: errorUpdate } = useHttp(update, false)
    const { sendRequest: getProductByID, status: statusGetP, data: product, error: errorGetP } = useHttp(getProduct, false)
    const { sendRequest: getSubsByCategory, status: statusSubs, data: subs, error: errorGetSubs } = useHttp(getByCategory, false)
    const { setValue, getValues } = form;
    const category = form.watch('category')
    useEffect(() => {
        if (category && flag === 0) {
            // flag = 1
            getSubsByCategory(category)
            // setValue('subcategory', '')
        }

    }, [category, getSubsByCategory, setValue])
    useEffect(() => {
        getAllCategory()
    }, [getAllCategory]);

    useEffect(() => {
        if (statusSubs === 'completed' && !errorGetSubs) {
            setSubCategories(subs)
        }
    }, [subs, statusSubs, errorGetSubs])
    useEffect(() => {
        if (statusGetP === 'completed' && !errorGetP) {
            setValue('name', product.name)
            setValue('priceOriginal', product.priceOriginal)
            setValue('priceSale', product.priceSale)
            setValue('imageCover', product.imageCover)
            setValue('images', product.images)
            setValue('description', product.description)
            setValue('category', product.category._id)
            setValue('subcategory', product.subcategory._id)
            // setValue('brand', product.brand.id)
            // setValue('variants', product.variants)
            // setValue('attributes', product.attributes)
            setValue('weight', product.weight)
            setValue('height', product.height)
            setValue('width', product.width)
            setValue('length', product.length)
            setValue('countInStock', product.countInStock)
            flag = 0
            getSubsByCategory(product.category._id)
        }
    }, [statusGetP, errorGetP, product, setValue, getSubsByCategory]);
    const handleUpload = async (file) => {
        console.log(file);

        try {
            setLoadingUpload(true);
            const form = new FormData();
            form.append('imageCover', file);
            const { data } = await productApi.upload(form)
            toast.success('Upload thành công')
            // setUserInfo(preUser => ({ ...preUser, photo: data.url }))
            setValue('imageCover', data)

        }
        catch (err) {
            toast.error('Upload không thành công. Thử lại sau')
        }
        setLoadingUpload(false)
    }
    const handleUploadSub = async (file, idx) => {
        console.log(file, idx);

        try {
            setLoadingUpload(true);
            const form = new FormData();
            form.append('image', file);
            const { data } = await productApi.upload(form)
            // setUserInfo(preUser => ({ ...preUser, photo: data.url }))
            toast.success('Upload thành công')
            const images = [...getValues('images')]
            console.log(images)
            images[idx] = data;
            setValue('images', images)
        }
        catch (err) {
            // toast.error('Upload không thành công. Thử lại sau')
            toast.error(err)
        }
        setLoadingUpload(false)
    }
    const handleRemoveImage = async (public_id) => {
        try {
            setLoadingUpload(true);

            const { data } = await productApi.removeImage(public_id)
            // setUserInfo(preUser => ({ ...preUser, photo: data.url }))
            setValue('imageCover', '')
            toast.success('Upload thành công')
        }
        catch (err) {
            toast.error('Upload không thành công. Thử lại sau')
        }
        setLoadingUpload(false)
    }
    useEffect(() => {
        if (productID) {
            getProductByID(productID)


        }


    }, [productID, getProductByID]);

    const handelCategoryChange = (e) => {
        console.log(e)
        setCategorySelected(e)

    }


    useEffect(() => {
        if (statusUpdate === 'completed' && !errorUpdate) {
            toast.success("Cập nhật Thành công")
            navigate('/admin/product')
        }
        if (statusUpdate === 'completed' && errorUpdate) {
            toast.error(errorUpdate)
        }
    }, [statusUpdate, errorUpdate, navigate])
    const submitHandler = async (form) => {
        console.log("form", form)

        if (productID) {
            const product = {
                id: productID,
                ...form,

            }
            updateProduct(product)
        }
        else {
            // try {
            //     const data = await dispatch(createProduct(form))

            //     const result = unwrapResult(data)
            //     console.log(result)
            //     enqueueSnackbar("Thêm sản phẩm thành công", { variant: "success" })
            //     history.push('/admin/product')
            // } catch (e) {
            //     enqueueSnackbar("Thêm sản phẩm thất bại.", { variant: "error" })
            // }
        }






    }


    return (
        <Container>
            <form className="form" onSubmit={form.handleSubmit(submitHandler)}>
                {statusGet === 'completed' && (
                    <FormProductInformation form={form} categories={categories} subcategories={subCategories} ></FormProductInformation>

                )}
                <UploadImage form={form} onUpload={handleUpload} loading={loadingUpload} onRemove={handleRemoveImage} onUploadSub={handleUploadSub} />
                {/* <FormProductDetail form={form} attributes={attributes} /> */}

                <Button type="submit" color="primary" variant="contained" style={{ marginBottom: '15px' }}>{productID ? 'Cập nhật' : 'Thêm sản phẩm'}</Button>
            </form >
        </Container >
    );
}

export default ProductEditPage;