import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../screens/LoginPage';

const AuthRouteSwitch = () => {
    return (
        <Switch>
            <Route exact path="/login">
                <LoginPage />
            </Route>
        </Switch>
    )
}

export default AuthRouteSwitch