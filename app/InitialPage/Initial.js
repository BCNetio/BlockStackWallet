import React from 'react';
import { isSignInPending, isUserSignedIn, handlePendingSignIn } from 'blockstack';
import Home from '../Dashboard/Dashboard';
import { Auth } from './Auth';

export const Initial = () => {
  if (isSignInPending()) {
    handlePendingSignIn().then(() => (window.location = window.location.origin));
    return <div>Login verification in progress</div>;
  }
  return isUserSignedIn() ? <Home /> : <Auth />;
};
