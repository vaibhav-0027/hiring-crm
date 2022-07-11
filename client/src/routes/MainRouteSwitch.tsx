import React from 'react'
import { Switch } from 'react-router-dom';
import Clients from '../screens/Clients';
import Companies from '../screens/Companies';
import Contacts from '../screens/Contacts';
import HomePage from '../screens/HomePage';
import ProfilePage from '../screens/ProfilePage';
import Vacancies from '../screens/Vacancies';
import PrivateRoute from './PrivateRoute';

const MainRouteSwitch = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/home" component={HomePage} />
            <PrivateRoute exact path="/companies" component={Companies} />
            <PrivateRoute exact path="/contacts" component={Contacts} />
            <PrivateRoute exact path="/clients" component={Clients} />
            <PrivateRoute exact path="/vacancies" component={Vacancies} />
            <PrivateRoute exact path="/profile" component={ProfilePage} />

            {/* <Redirect from="/" to="/home" /> */}
        </Switch>
    )
}

export default MainRouteSwitch