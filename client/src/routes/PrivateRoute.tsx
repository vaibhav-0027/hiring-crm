import React, { useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Drawer from '../components/Drawer';
import { auth } from '../helpers/firebase';
import { clearUserInfo } from '../helpers/localStorageHandler';

interface PrivateRouteType {
    component: () => JSX.Element;
    exact?: boolean;
    path: string;
}

const PrivateRoute = (props: PrivateRouteType) => {

    const { component, exact, path } = props;
    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                clearUserInfo();
                history.push("/login");
                return;
            }
        })
        // eslint-disable-next-line
    }, []);

    return (
        <div className='flex flex-col h-screen w-screen overflow-x-hidden overflow-y-auto'>
            <div className='h-14 max-h-14 w-full'>
                <Navbar />
            </div>
            <div className='h-full  flex flex-row'>
                <Drawer />
                <Route
                    exact={exact}
                    path={path}
                    component={component}
                >
                </Route>
            </div>
        </div>
    )
}

export default PrivateRoute