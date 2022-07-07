import React from 'react'
import { Redirect } from 'react-router-dom'
import AuthRouteSwitch from './AuthRouteSwitch'
import MainRouteSwitch from './MainRouteSwitch'

const MainRoute = () => {
    return (
        <>
            <AuthRouteSwitch />
            <MainRouteSwitch />
            <Redirect from="/" to="/login" />
        </>
    )
}

export default MainRoute