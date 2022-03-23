import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import Login from './features/user/pages/Login';
import ReactDOM from 'react-dom';
import { MockedProvider } from '@apollo/client/testing';
import { loginQueryMock } from './features/user/api/login/loginMock';
import { MemoryRouter, Router } from 'react-router-dom';
import GraphqlProvider from './components/GraphqlProvider';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});

describe('Login component test', () => {
  let container: HTMLDivElement;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(
      <MemoryRouter initialEntries={['/login']}>
        <GraphqlProvider useMocks>
          <Provider store={store}>
            <Login />
          </Provider>
        </GraphqlProvider>
      </MemoryRouter>,
      container
    );
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  test('Renders correctly initial document', () => {
    const inputs = container.querySelectorAll('input');
    expect(inputs).toHaveLength(3);
    expect(inputs[0].name).toBe('login');
    expect(inputs[1].name).toBe('password');
    expect(inputs[2].name).toBe('Login');
  });

  test('renders login', () => {
    const { getAllByText } = render(
      <GraphqlProvider useMocks={true}>
        <Provider store={store}>
          <App />
        </Provider>
      </GraphqlProvider>
    );
    const loginArr = screen.getAllByText(/login/i);
    expect(loginArr[0]).toBeInTheDocument();
    expect(loginArr[1]).toBeInTheDocument();
  });
});
