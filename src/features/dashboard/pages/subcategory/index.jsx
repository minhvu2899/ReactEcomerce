import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ManageSubCategoryPage from './ManageSubCategoryPage';
import SubCategoryCreatePage from './SubCategoryCreatePage';
const ManageSubCategoryFeature = () => {
    return (
        <Routes>
            <Route path="" element={<ManageSubCategoryPage />} />
            <Route path=":id/edit" element={<SubCategoryCreatePage />} />
            <Route path="create" element={<SubCategoryCreatePage />} />

        </Routes>
    )
}
export default ManageSubCategoryFeature