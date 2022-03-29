import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from './app/store';
import GraphqlProvider from './components/GraphqlProvider';
import Home from './features/balloon/pages/Home';
import BalloonsList from './features/balloon/components/BalloonsList';
import { MemoryRouter } from 'react-router-dom';

//test('renders learn react link', async () => {
//  render(
//    <MemoryRouter initialEntries={['/']}>
//       <GraphqlProvider useMocks>
///        <Provider store={createStore()}>
//            <BalloonsList />
//          </Provider>
//       </GraphqlProvider>
//      </MemoryRouter>,
//  );

//  //expect(screen.getByText('Balloons')).toBeInTheDocument();
//  expect(await screen.findByText(/Balloons/i)).toBeInTheDocument();
//  screen!.debug();
//});

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
