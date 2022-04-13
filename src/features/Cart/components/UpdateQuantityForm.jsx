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
import IconButton from '@mui/material/IconButton';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useDispatch } from 'react-redux';
import { setQuantity } from '../cartSlice';
import { toast } from "react-toastify";
import { updateCartItems } from './../cartSlice';
UpdateQuantityForm.propTypes = {
    onSubmit: PropTypes.object,
    product: PropTypes.object,
};

function UpdateQuantityForm({ qty, id }) {
    const dispatch = useDispatch()
    const updateQuantity = (quantity) => {
        // console.log(quantity)
        if (quantity <= 10) {


            dispatch(updateCartItems({ id, quantity }))
        }
        else {

            toast.error(
                'Số lượng mua tối đa là 10'
            )
        }
    }
    const handleOnChange = (e) => {
        console.log('onchange', e.target.value)
        const quantity = Number(e.target.value);
        if (quantity <= 10 && quantity >= 1) {


            dispatch(updateCartItems({ id, quantity }))
        }
        else if (quantity === '') {
            return;
        } else {

            dispatch(updateCartItems({ id, quantity: 10 }))
            toast.error(
                'Số lượng mua tối đa là 10'
            )
        }
    }
    const handleOnBlur = (e) => {

    }
    return (
        <FormControl size="small" variant="outlined" margin="normal">
            {/* <InputLabel htmlFor={name}>{label}</InputLabel> */}
            {/* <Typography>{label}</Typography> */}
            <Box>
                <IconButton onClick={() => updateQuantity(qty > 1 ? qty * 1 - 1 : 1)}>
                    <RemoveCircleOutline />
                </IconButton>
                <OutlinedInput sx={{ maxWidth: '70px' }}
                    id="quantity"
                    type="number"

                    // error={!!hasError}
                    value={qty}
                    onChange={
                        handleOnChange}

                    onBlur={handleOnBlur}
                    name="quantity"

                />
                <IconButton onClick={() => updateQuantity(qty * 1 + 1)}>
                    <AddCircleOutline />
                </IconButton>
            </Box>
            {/* <FormHelperText error={false}>{"ádasdasd"}</FormHelperText> */}
        </FormControl>
    );
}

export default UpdateQuantityForm;