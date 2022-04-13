import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Paper, Typography } from '@mui/material';
import categoryApi from 'api/categoryApi';
import { FormInputDropdown } from 'components/SelectField';
import useHttp from 'hooks/use-http';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import subcategoryApi from '../../../../api/subcategoryApi';
import InputField from './../../../../components/InputField/index';
import { makeStyles } from '@mui/styles'
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
function SubCategoryCreatePage(props) {
    const navigate = useNavigate();

    const params = useParams();
    const subCategoryId = params.id;
    const [categories, setCategories] = useState([])
    const { update, add, get } = subcategoryApi;
    const { getAll } = categoryApi;
    const { sendRequest: AddSubCategory, status: statusAdd, data: SubCategory, error: errorAdd } = useHttp(add, false)
    const { sendRequest: updateSubCategory, status: statusUpdate, error: errorUpdate } = useHttp(update, true);
    const { sendRequest: getSubCategory, status: statusGet, data: subCategory, error: errorGet } = useHttp(get, false);
    const { sendRequest: getAllCategory, status: statusGetAll, data: listCategories, error: errorGetAll } = useHttp(getAll, true);

    useEffect(() => {

        if (statusAdd === 'completed' && !errorAdd) {
            toast.success("Thêm danh mục thành công")
            navigate('/admin/subcategory')

        }
        if (statusAdd === 'completed' && errorAdd) {
            toast.error(errorAdd)
        }
    }, [statusAdd, errorAdd, navigate])
    useEffect(() => {

        if (statusGetAll === 'completed' && !errorGetAll) {

            setCategories(listCategories)

        }
        if (statusGetAll === 'completed' && errorGetAll) {
            toast.error(errorGetAll)
        }
    }, [statusGetAll, errorGetAll, listCategories])
    useEffect(() => {

        if (statusUpdate === 'completed' && !errorUpdate) {
            toast.success("Cập nhật danh mục thành công")
            navigate('/admin/subcategory')

        }
        if (statusUpdate === 'completed' && errorUpdate) {
            toast.error(errorUpdate)
        }
    }, [statusUpdate, errorUpdate, navigate])



    const classes = useStyles()
    const schema = yup.object().shape({
        name: yup.string().required('Vui lòng nhập tên danh mục'),
        slug: yup.string().required('Vui lòng nhập slug'),
        description: yup.string().required('Vui lòng nhập mô tả'),
        category: yup.string().required('Vui lòng chọn danh mục'),
    });
    const form = useForm({
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            category: ''
        },
        resolver: yupResolver(schema),
    })
    const { setValue } = form
    useEffect(() => {

        if (statusGet === 'completed' && !errorGet && statusGetAll === 'completed' && !errorGetAll) {

            console.log(subCategory)
            setValue('name', subCategory.name)
            setValue('slug', subCategory.slug)
            setValue('description', subCategory.description)
            setValue('category', subCategory.category)

        }
        if (statusGet === 'completed' && errorGet) {
            toast.error(errorGet)
        }
    }, [statusGet, errorGet, subCategory, setValue, statusGetAll, errorGetAll])
    useEffect(() => {
        if (subCategoryId) {
            getSubCategory(subCategoryId)
        }
    }, [subCategoryId, getSubCategory])
    useEffect(() => {
        getAllCategory()
    }, [getAllCategory])
    const submitHandler = async (form) => {
        console.log(form)

        if (!subCategoryId) {
            AddSubCategory(form)
        }

        else {

            updateSubCategory({
                id: subCategoryId,
                ...form
            })
        }




    }
    useEffect(() => {
        (async () => {
            try {
                const { data } = await categoryApi.getAll();
                // setCategories(data.map(x => (
                //     {
                //         value: x.id,
                //         label: x.name
                //     }
                // )));
                setCategories(data.data.data)
                console.log(data)
            } catch (error) {
                console.log("Fetch data fair:", error);
            }

        })()



    }, []);

    return (
        <Container maxWidth="sm">
            <Paper className={classes.root}>
                <Typography variant="h4">{!subCategoryId ? 'Thêm danh mục sản phẩm' : 'Cập nhật danh mục sản phẩm'}</Typography>
                <form className="form" onSubmit={form.handleSubmit(submitHandler)}>

                    <InputField name='name' label='Tên danh mục' form={form}></InputField>
                    <InputField name='slug' label='Slug' form={form}></InputField>
                    <InputField name='description' label='Mô tả chi tiết' form={form}></InputField>

                    <FormInputDropdown name="category" label="Danh mục cha" form={form} options={categories} />


                    {/* <InputField name='category' label='Danh mục' form={form}></InputField> */}
                    <Button type="submit" color="primary" variant="contained" style={{ marginBottom: '15px' }}>{!subCategoryId ? 'Thêm' : 'Cập nhật'}</Button>
                </form >
            </Paper>
        </Container >
    );
}

export default SubCategoryCreatePage;