import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ManageRatingPage from './ManageRatingPage';
// import UserCreateOrEditPage from './UserCreateOrEditPage';
const ManageReviewsFeature = () => {
    return (
        <Routes>
            <Route path="" element={<ManageRatingPage />} />
            {/* <Route path=":id/edit" element={<UserCreateOrEditPage />} /> */}
            {/* <Route path="create" element={<UserCreateOrEditPage />} /> */}

        </Routes>
    )
}
export default ManageReviewsFeature