import React from 'react';
import PropTypes from 'prop-types';
import { Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
LayoutAdmin.propTypes = {

};

function LayoutAdmin() {
    return (
        <>
            <Outlet />
            <ToastContainer /></>
    );
}

export default LayoutAdmin;