import { yupResolver } from '@hookform/resolvers/yup';

import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import QuantityFiled from 'components/QuantityField';

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
    product: PropTypes.object,
};

function AddToCartForm({ onSubmit = null, countInStock = 10, variant }) {
    const schema = yup.object().shape({
        quantity: yup.number()
            .required('Vui lòng nhập số')
            .min(1, 'Số lượng tối thiểu là 1')
            .max(countInStock, "Không vượt quá số lượng trong kho")
            .typeError('Vui lòng nhập một số'),
    });

    const form = useForm({
        defaultValues: {
            quantity: 1,
            variant: ''
        },
        resolver: yupResolver(schema),
    })
    useEffect(() => {
        form.setValue('variant', variant ? variant : null)
    }, [variant, form])
    const handleSubmit = (values) => {

        if (onSubmit) {
            onSubmit(values);

        }


    }
    const error = form.formState.errors;

    const disabled = Object.keys(error).length === 0 ? false : true;

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Box>

                {countInStock > 0 && (
                    <>
                        <Typography sx={{ mt: 2, textAlign: 'left', ml: 2, fontSize: '16px', fontWeight: 500 }}>Số lượng</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <QuantityFiled name='quantity' label='Số lượng' form={form} />
                            <Typography variants="subtitle"> {countInStock} có sẵn</Typography>
                        </Box>
                    </>

                )}
                {countInStock === 0 && (
                    <Chip color="error" label="Sản phẩm tạm hết hàng" />
                )}

            </Box>
            {countInStock > 0 && (
                <Button type="submit" variant="contained" color="primary" size="large" disabled={disabled}>
                    Thêm vào giỏ
                </Button>
            )}
            <input type="hidden" {...form.register('variant')} name="variant" />



        </form>
    );
}

export default AddToCartForm;