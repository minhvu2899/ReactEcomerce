import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';

CartFeature.propTypes = {

};

function CartFeature(props) {

    return (

        <Routes>
            <Route path='/' element={<CartPage />} />
        </Routes>
    );

}

export default CartFeature;