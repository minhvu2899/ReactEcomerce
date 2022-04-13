import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

function CheckoutStep(props) {
    const steps = [
        'Đăng nhập',
        'Địa chỉ giao hàng',
        'Thanh toán và đặt hàng',

    ];
    return (
        <>
            <Stepper activeStep={props.step} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    );
}

export default CheckoutStep;