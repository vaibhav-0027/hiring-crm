import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import AuthRouteSwitch from './AuthRouteSwitch';
import MainRouteSwitch from './MainRouteSwitch';

const MainApp = () => {
    return (
        <BrowserRouter>
            <AuthRouteSwitch />
            <MainRouteSwitch />
            <ToastContainer />
        </BrowserRouter>
    )
}

export default MainApp;