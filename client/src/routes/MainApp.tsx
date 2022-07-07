import React from 'react';
import { BrowserRouter } from "react-router-dom";
import AuthRouteSwitch from './AuthRouteSwitch';
import MainRouteSwitch from './MainRouteSwitch';

const MainApp = () => {
    return (
        <BrowserRouter>
            <AuthRouteSwitch />
            <MainRouteSwitch />
        </BrowserRouter>
    )
}

export default MainApp