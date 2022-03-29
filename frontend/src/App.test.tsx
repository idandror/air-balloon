import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, store } from './app/store';
import App from './App';
import Login from './features/user/pages/Login';
import ReactDOM from 'react-dom';
import { MockedProvider } from '@apollo/client/testing';
import { loginQueryMock } from './features/user/api/login/loginMock';
import { MemoryRouter, Router } from 'react-router-dom';
import GraphqlProvider from './components/GraphqlProvider';
import Home from './features/balloon/pages/Home';

test('renders learn react link', () => {
  const { getByText } = render(
    <GraphqlProvider useMocks>
      <Provider store={createStore()}>
        <Home />
      </Provider>
    </GraphqlProvider>
  );

  //expect(screen.getByText("User")).toBeInTheDocument();
  expect(screen.getByLabelText(/User Name/i)).toBeInTheDocument();
});

//describe('Login component test', () => {
//  let container: HTMLDivElement;
//  beforeEach(() => {
//    container = document.createElement('div');
//    document.body.appendChild(container);
//    ReactDOM.render(
//      <MemoryRouter initialEntries={['/login']}>
//        <GraphqlProvider useMocks>
//          <Provider store={createStore()}>
//            <Login />
//          </Provider>
//        </GraphqlProvider>
//      </MemoryRouter>,
//      container
//    );
//  });

//  afterEach(() => {
//    document.body.removeChild(container);
//    container.remove();
//  });

//  test('Renders correctly initial document', () => {
//    const inputs = container.querySelectorAll('input');
//    expect(inputs).toHaveLength(3);
//    expect(inputs[0].name).toBe('login');
//    expect(inputs[1].name).toBe('password');
//    expect(inputs[2].name).toBe('Login');
//  });

//  test('renders login', () => {
//    const { getAllByText } = render(
//      <GraphqlProvider useMocks={true}>
//        <Provider store={store}>
//          <App />
//        </Provider>
//      </GraphqlProvider>
//    );
//    const loginArr = screen.getAllByText(/login/i);
//    expect(loginArr[0]).toBeInTheDocument();
//    expect(loginArr[1]).toBeInTheDocument();
//  });
//});

describe('HomePage', () => {
  //   beforeAll(() => {});
  //   test("renders HomePage component", () => {
  //     render(
  //       <ApolloProvider useMocks>
  //         <ReduxProvider store={createStore()}>
  //           <HomePage />
  //         </ReduxProvider>
  //       </ApolloProvider>
  //     );
  //     screen!.debug();
  //   });
  test('check for Button component in HomePage', () => {
    //   render(
    //     <ApolloProvider useMocks>
    //       <ReduxProvider store={createStore()}>
    //         <HomePage />
    //       </ReduxProvider>
    //     </ApolloProvider>
    //   );
    //   expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
