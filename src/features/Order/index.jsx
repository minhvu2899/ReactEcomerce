import { Box } from '@mui/material';
import NotFound from 'components/NotFound';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OrderCompleted from './pages/OrderCompleted';
import PlaceOrderPage from './pages/PlaceOrderPage';



function OrderFeature(props) {
    return (
        <Box pt={4}>
            <Routes>
                <Route path={'/place-order'} exact element={< PlaceOrderPage />} />
                <Route path={'/payment/completed'} exact element={< OrderCompleted />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </Box>
    );
}

export default OrderFeature;