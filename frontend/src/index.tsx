import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import GraphqlProvider from './components/GraphqlProvider';
import { APOLLO_GRAPHQL_USE_MOCK } from './utils/constants';

ReactDOM.render(
  <React.StrictMode>
    <GraphqlProvider useMocks={APOLLO_GRAPHQL_USE_MOCK}>
      <Provider store={store}>
        <App />
      </Provider>
    </GraphqlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
