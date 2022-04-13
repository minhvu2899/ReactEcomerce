import { Button, Container, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Box } from '@mui/material';
import React from 'react';
import CheckoutStep from '../components/CheckoutStep';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPaymentMethod } from 'features/Cart/cartSlice';
import { Alert } from '@mui/material';
import { reset } from '../orderSlice';


function OrderCompleted(props) {
    const [value, setValue] = React.useState('paypal');
    const navigate = useNavigate();
    const dispath = useDispatch()
    const { state } = useLocation();

    const handleClick = () => {
        // dispath(addPaymentMethod(value))
        dispath(reset())
        navigate(`/user/order/${state.id}`)
    };
    return (
        <Container maxWidth="md">
            <Box>
                <Alert severity="success">

                    <strong>Thanh toán đơn hàng thành công!</strong>
                </Alert>
            </Box>

            <Typography variant="h4">Thank You !</Typography>

            <Box>
                <Button variant="contained" onClick={handleClick}>Quay lại đơn hàng</Button>
            </Box>
        </Container>
    );
}

export default OrderCompleted;