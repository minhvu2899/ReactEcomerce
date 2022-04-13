import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ManageOrdersPage from './ManageOrdersPage';
import OrderDetailPage from './OrderDetailPage';
const ManageOrdersFeature = () => {
    return (
        <Routes>
            <Route path="" element={<ManageOrdersPage />} />
            <Route path=":id" element={<OrderDetailPage />} />
            {/* <Route path=":id/edit" element={<SubCategoryCreatePage />} />
            <Route path="create" element={<SubCategoryCreatePage />} /> */}

        </Routes>
    )
}
export default ManageOrdersFeature