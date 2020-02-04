import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import { ApolloProvider } from 'react-apollo';
import './main.css';
import { client } from './Configs/mainConfig';

ReactDom.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
