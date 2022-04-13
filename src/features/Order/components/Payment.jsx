import { Paper, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';


function Payment({ paymentMethod, setPaymentMethod, shipMethod, setShipMethod }) {

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };
    const handleShipChange = (event) => {
        setShipMethod(event.target.value);
    };

    return (

        <Paper sx={{ textAlign: 'left', px: 1, my: 2 }}>
            <Typography fontWeight="bold" variant="h6">3. Hình thức thanh toán</Typography>

            <FormControl component="fieldset">

                <RadioGroup
                    aria-label="payment method"
                    name="controlled-radio-buttons-group"
                    value={paymentMethod}
                    onChange={handlePaymentChange}
                >
                    <FormControlLabel value="Thanh toán bằng thẻ tín dụng" control={<Radio />} label="Paypal or Credit card" />
                    <FormControlLabel value="Thanh toán khi nhận hàng" control={<Radio />} label="Thanh toán khi nhận hàng" />
                </RadioGroup>
            </FormControl>
            <Typography fontWeight="bold" variant="h6">4. Hình thức vận chuyện</Typography>
            <FormControl component="fieldset">

                <RadioGroup
                    aria-label="payment method"
                    name="controlled-radio-buttons-group"
                    value={shipMethod}
                    onChange={handleShipChange}
                >
                    <FormControlLabel value="Giao hàng tiết kiệm" control={<Radio />} label="Giao hàng tiết kiệm" />
                    <FormControlLabel value="Giao hàng nhanh" control={<Radio />} label="Giao hàng nhanh" />
                </RadioGroup>
            </FormControl>

        </Paper>

    );
}

export default Payment;