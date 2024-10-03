import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

const AUTH_0_DOMAIN = process.env.REACT_APP_AUTH_0_DOMAIN;
const AUTH_0_CLIENT_ID = process.env.REACT_APP_AUTH_0_CLIENT_ID;

// Check for Auth0 environment variables before render
if (!AUTH_0_DOMAIN || !AUTH_0_CLIENT_ID) {
  throw new Error('AUTH0_DOMAIN or AUTH0_CLIENT_ID environment variable is not set');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <Auth0Provider
    domain={AUTH_0_DOMAIN!}
    clientId={AUTH_0_CLIENT_ID!} 
    authorizationParams={{ redirect_uri: window.location.origin }}
  >

    <App />

  </Auth0Provider>
  </React.StrictMode>
);
