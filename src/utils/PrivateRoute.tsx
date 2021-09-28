import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IPrivateRouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const PrivateRoute = ({ component:Component, ...rest }: IPrivateRouteProps) => {
    return (
        <Route
        {...rest}
        render={(props) => {
            if (localStorage.getItem('accessToken')) {
                return <Component {...props} />
            } else {
                return <Redirect to='/login' />
            }
        }}
    />)
}

export default PrivateRoute;