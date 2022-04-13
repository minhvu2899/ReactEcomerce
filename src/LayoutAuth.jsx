import React from 'react';
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";


function LayoutAuth({ children }) {
    return (
        <>
            <Outlet />
            <ToastContainer />

        </>
    );
}

export default LayoutAuth;