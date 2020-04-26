import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, Operation, NextLink, FetchResult, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { ApolloProvider } from '@apollo/react-hooks';

const localGraphQL = 'http://localhost:4000/graphql';

const httpLink = new HttpLink({ uri: localGraphQL });

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

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});

const concattedLink = afterwareLink.concat(httpLink);

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  concattedLink,
);

const client = new ApolloClient({
  link: link,
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
