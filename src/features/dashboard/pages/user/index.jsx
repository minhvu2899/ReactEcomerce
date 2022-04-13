import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ManageUserPage from './ManageUserPage';
import UserCreateOrEditPage from './UserCreateOrEditPage';
const ManageUsersFeature = () => {
    return (
        <Routes>
            <Route path="" element={<ManageUserPage />} />
            <Route path=":id/edit" element={<UserCreateOrEditPage />} />
            <Route path="create" element={<UserCreateOrEditPage />} />

        </Routes>
    )
}
export default ManageUsersFeature