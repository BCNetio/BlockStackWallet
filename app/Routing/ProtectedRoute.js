import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isUserSignedIn } from 'blockstack'

export const ProtectedRoute = ({Component, ...props}) => (
    <Route
        {...props}
        render={props =>
            isUserSignedIn() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{pathname: '/ ', state: { from: props.location }}} />
            )
        }
    />
);
