import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
// import FormProductVariants from './FormProductVariants';
import { makeStyles } from '@mui/styles';
import CheckBoxField from 'components/CheckBox';
import { FormInputDropdown } from 'components/SelectField';
import React from 'react';
import InputField from './../../../../components/InputField/index';
import FormProductInfoDeliver from './FormProductInfoDeliver';
import RichEditer from './RichEditer';
const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: theme.spacing(2),
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    input: {
        display: 'none'
    },
    upload: {
        border: '1px solid #ccc',
        marginRight: '8px'
    },
    large: {
        width: '100px', height: '100px'
    }
}));
const FormProductInformation = ({ form, categories, subcategories, onCategoryChange }) => {

    const { setValue, getValues } = form;
    const isPromotion = form.watch('isPromotion')
    const classes = useStyles();

    // console.log(images)
    // const handelClickRemoveImages = (id) => {
    //     console.log(id)
    //     const newImages = images.filter((img, idx) => idx !== id)
    //     setImages(newImages)
    //     setValue('images', newImages)
    // }




    // const image = getValues('image')
    // const images = getValues('images')
    // const subcategory = form.watch('subcategory')
    // const brand = form.watch('brand')
    // console.log(image, images)

    // }, [subcategory, onSubCategoryChange])
    // useEffect(() => {
    //     if (brand) {
    //         onBrandChange(brand)
    //     }

    // }, [brand, onBrandChange])

    return (
        <Paper elevation={3} sx={{ mb: 2, pb: 2 }}>

            <Container maxWidth="lg">


                <Grid container>
                    <Grid item container>
                        <Grid item xs={12}>
                            <Box padding={1}>
                                <Typography variant="h4" align="left">Thông tin cơ bản</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ mb: 2 }}>
                                <InputField name='name' label='Tên sản phẩm' form={form}></InputField>
                            </Box>
                        </Grid>
                    </Grid>

                </Grid>




                <Grid container spacing={1}>
                    <Grid item xs={6}>


                        <FormInputDropdown name="category" label="Danh mục cha" form={form} options={categories} />

                    </Grid>
                    {subcategories && subcategories.length > 0 && (
                        <Grid item xs={6}>


                            <FormInputDropdown name="subcategory" label="Danh mục con" form={form} options={subcategories} />

                        </Grid>
                    )}

                    {/* <Grid item xs={12}>


                        <FormInputDropdown name="brand" label="Thương hiệu" form={form} options={brands} />

                    </Grid> */}
                    <Grid item xs={12}>
                        <InputField type="number" name='priceOriginal' label='Giá gốc sản phẩm' form={form}></InputField>
                    </Grid>
                    <Grid item xs={12}>
                        <InputField type="number" name='priceSale' label='Giá bán sản phẩm' form={form}></InputField>
                    </Grid>
                    <Grid item xs={12}>
                        <InputField type="number" name='countInStock' label='Số lượng trong kho' form={form}></InputField>
                    </Grid>
                    <Grid item xs={12}>
                        <Box padding={1}>
                            <Typography variant="h6" align="left">Mô tả sản phẩm</Typography>
                        </Box>
                        <RichEditer name="description" form={form} />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h6" align="left">Thông tin phí vận chuyển:</Typography><CheckBoxField name="isFreeShip" label="Miễn phí ship" form={form} />
                        </Box>

                    </Grid>
                    <FormProductInfoDeliver form={form} />

                </Grid>




            </Container >
        </Paper >

    );
}

export default FormProductInformation;