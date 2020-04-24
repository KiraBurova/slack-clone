require('module-alias/register');
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, Operation, NextLink, FetchResult } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';

import { ApolloProvider } from '@apollo/react-hooks';

const httpLink = createHttpLink({ uri: 'http://localhost:5000/graphql' });

const afterwareLink = new ApolloLink((operation: Operation, forward: NextLink) => {
  return forward(operation).map((response: FetchResult) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;
    const tokenHeaders = context.response.headers.get('x-token');
    if (tokenHeaders) {
      const token = headers.get('x-token');

      if (token) {
        localStorage.setItem('token', token);
      }
    }
    return response;
  });
});

const link = afterwareLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
