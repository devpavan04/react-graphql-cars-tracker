import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';
import { GeistProvider, CssBaseline } from '@geist-ui/core';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <GeistProvider>
      <CssBaseline />
      <App />
    </GeistProvider>
  </ApolloProvider>
);
