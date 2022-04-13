import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ManageCategoryPage from './ManageCategoryPage';
import CreateOrEditCategoryPage from './CreateOrEditCategoryPage';
const ManageCategoryFeature = () => {
    return (
        <Routes>
            <Route path="" element={<ManageCategoryPage />} />
            <Route path=":id/edit" element={<CreateOrEditCategoryPage />} />
            <Route path="create" element={<CreateOrEditCategoryPage />} />

        </Routes>
    )
}
export default ManageCategoryFeature