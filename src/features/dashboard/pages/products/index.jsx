import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ManageProductsPage from './ManageProductsPage';
import ProductCreatePage from './ProductCreatePage';
import ProductEditPage from './ProductEditPage';
const ManageProductFeature = () => {
    return (
        <Routes>
            <Route path="" element={<ManageProductsPage />} />
            <Route path=":id/edit" element={<ProductEditPage />} />
            <Route path="create" element={<ProductEditPage />} />
        </Routes>
    )
}
export default ManageProductFeature