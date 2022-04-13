import { Button, Container, makeStyles, Paper, Typography } from '@mui/material';
import Fields from 'components/FieldArray/index';
import React, { useState } from 'react';
import productOptionsApi from 'api/productOptionsApi';
import { useEffect } from 'react';
import InputField from 'components/InputFiled';

function FormProductVariants({ form }) {

    const [colors, setColors] = useState([]);
    const [isVariant, setVariant] = useState('');
    const [sizes, setSizes] = useState([]);
    const { control, register, getValues, errors, watch } = form;
    const handleClick = () => {
        setVariant(true)
    }
    useEffect(() => {
        (async () => {
            try {

                const { data: colors } = await productOptionsApi.getAllColor();
                const { data: sizes } = await productOptionsApi.getAllSize();

                // setCategories(category);

                setColors(colors)
                setSizes(sizes)


            } catch (error) {
                console.log("Fetch data fair:", error);
            }

        })()



    }, []);
    useEffect(() => {
        let data = watch('variants')
        let data1 = getValues('variants')

        if ((data && data.length > 0) || (data1 && data1.length > 0)) {
            setVariant(true)
        }
        else {
            setVariant(false)
        }

    }, [watch, getValues]);

    return (

        <Paper elevation={3} >
            <Typography variant="h4" align="left" style={{ padding: '8px' }}>Thông tin bán hàng</Typography>
            <Container maxWidth="lg">


                <>
                    <Typography variant="subtite1" align="left" style={{ padding: '8px' }}>Thông tin phân loại sản phẩm</Typography>
                    <Fields
                        {...{ control, register, getValues, errors, colors, sizes, watch }}
                    />
                </>

                {!isVariant && (<>
                    <Button onClick={handleClick} color="primary" variant="contained">Thêm biến thể sản phẩm</Button>
                    <InputField name='countInStock' label='Số lượng trong kho' form={form}></InputField>
                    <InputField name='product_cost' label='Chi phí sản phẩm' form={form}></InputField>
                    <InputField name='originalPrice' label='Giá gốc' form={form}></InputField>
                    <InputField name='discountPercent' label='Giảm giá(%)' form={form}></InputField>
                </>)}


            </Container>
        </Paper >
    );
}

export default React.memo(FormProductVariants);