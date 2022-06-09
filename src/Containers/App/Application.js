import React, { useEffect } from 'react';
import App from '../../App';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { decodeToken, isExpired } from 'react-jwt';
import SelectorPage from '../../Pages/selector/SelectorPage';
import ExcepcionadasPage from '../../Pages/excepcionadas/ExcepcionadasPage';

const Application = (props) => {
    const history = useHistory();

    useEffect(() => {
        const AUTH_TOKEN = localStorage.getItem('token');
        if (AUTH_TOKEN && !isExpired(AUTH_TOKEN)) {
            // axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;
        } else {
            console.log('token expired');
            history.push({
                pathname: '/home',
            });
        }
    });

    return (
        <Switch>
            <Route path="/home" render={(props) => <App {...props} />} />
            <Route
                path="/selector"
                render={(props) => <SelectorPage {...props} />}
            />
            <Route
                path="/excepcionadas/:id"
                render={(props) => <ExcepcionadasPage {...props} />}
            />
            <Redirect from="/" to="/home" />
        </Switch>
    );
}

export default Application;