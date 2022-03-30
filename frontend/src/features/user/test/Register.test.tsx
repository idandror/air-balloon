import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from '../../../app/store';
import Register from '../pages/Register';
import GraphqlProvider from '../../../components/GraphqlProvider';
import userEvent from '@testing-library/user-event';

jest.mock('../../../utils/constants.ts', () => ({
  __esModule: true,
  APOLLO_GRAPHQL: true,
  isMock: false,
}));

describe('Register Form', () => {
  test('renders Register page', async () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <GraphqlProvider useMocks>
          <Provider store={createStore()}>
            <Register />
          </Provider>
        </GraphqlProvider>
      </MemoryRouter>
    );

    expect(
      screen.getByRole('button', { name: /SIGN UP/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: /Sign up/i })
    ).toBeInTheDocument();

    //screen!.debug();
  });

  test('renders Register page with wrong passwords', async () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <GraphqlProvider useMocks>
          <Provider store={createStore()}>
            <Register />
          </Provider>
        </GraphqlProvider>
      </MemoryRouter>
    );
    expect(
      screen.getByRole('button', { name: /SIGN UP/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: /Sign up/i })
    ).toBeInTheDocument();
    userEvent.type(screen.getByLabelText(/User Name/i), 'idan');
    userEvent.type(screen.getAllByLabelText(/PASSWORD/i)[0], '12345!@#');
    userEvent.type(screen.getAllByLabelText(/PASSWORD/i)[1], '12345');
    expect(screen.getByRole('button', { name: /SIGN UP/i })).toBeEnabled();
    expect(screen.getByText(/PASSWORDS DO NOT MATCH/i)).toBeInTheDocument();

    //screen!.debug();
  });

  test('renders Register page with correct password', async () => {
    const store = createStore();
    render(
      <MemoryRouter initialEntries={['/register', '/']}>
        <GraphqlProvider useMocks>
          <Provider store={store}>
            <Register />
          </Provider>
        </GraphqlProvider>
      </MemoryRouter>
    );
    expect(
      screen.getByRole('button', { name: /SIGN UP/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: /Sign up/i })
    ).toBeInTheDocument();
    userEvent.type(screen.getAllByLabelText(/Name/i)[0], 'moshe');
    userEvent.type(screen.getAllByLabelText(/Name/i)[1], 'moshe');
    userEvent.type(screen.getAllByLabelText(/PASSWORD/i)[0], '123456!@#');
    userEvent.type(screen.getAllByLabelText(/PASSWORD/i)[1], '123456!@#');
    expect(screen.getByRole('button', { name: /SIGN UP/i })).toBeEnabled();
    await waitFor(() =>
      userEvent.click(screen.getByRole('button', { name: /SIGN UP/i }))
    );
    expect(
      screen.queryByText(/PASSWORDS DO NOT MATCH/i)
    ).not.toBeInTheDocument();
    //userEvent.click(screen.getByRole('button', { name: /SIGN UP/i }));
    await waitFor(() => console.log(store.getState().auth));

    //screen!.debug();
  });
});
