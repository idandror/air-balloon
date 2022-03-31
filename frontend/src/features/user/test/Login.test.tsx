import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemoryRouter } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import Login from '../pages/Login';
import { createStore } from '../../../app/store';
import GraphqlProvider from '../../../components/GraphqlProvider';

jest.mock('../../../utils/constants.ts', () => ({
  __esModule: true,
  APOLLO_GRAPHQL: true,
  isMock: false,
}));

describe('LoginForm', () => {
  test('validate empty inputs and showing error', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <GraphqlProvider useMocks>
          <ReduxProvider store={createStore()}>
            <Login />
          </ReduxProvider>
        </GraphqlProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /SIGN IN/i })).toBeDisabled();
    userEvent.click(screen.getByRole('button', { name: /SIGN IN/i }));
    expect(screen.getByText('Max Length is 20 characters')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  test('check login button click with good credentials', async () => {
    const store = createStore();
    render(
      <MemoryRouter>
        <GraphqlProvider useMocks={true}>
          <ReduxProvider store={store}>
            <Login />
          </ReduxProvider>
        </GraphqlProvider>
      </MemoryRouter>
    );
    userEvent.type(screen.getByLabelText(/User Name/i), 'idan');
    userEvent.type(screen.getByLabelText(/Password/i), '123456!@#');
    expect(screen.getByRole('button', { name: /SIGN IN/i })).toBeEnabled();
    await waitFor(() =>
      userEvent.click(screen.getByRole('button', { name: /SIGN IN/i }))
    );
    await waitFor(() =>
      expect(screen.queryByText(/Wrong Username/i)).not.toBeInTheDocument()
    );
    //console.log(store.getState().auth);

    //screen!.debug();
  });

  test('check login with long username', () => {
    render(
      <MemoryRouter>
        <GraphqlProvider useMocks>
          <ReduxProvider store={createStore()}>
            <Login />
          </ReduxProvider>
        </GraphqlProvider>
      </MemoryRouter>
    );
    userEvent.type(
      screen.getByLabelText(/User Name/i),
      'iaksldjasldjashduoijasdnmalskddan'
    );
    userEvent.type(screen.getByLabelText(/Password/i), '12345612312312');
    expect(screen.getByRole('button', { name: /SIGN IN/i })).toBeDisabled();
    expect(screen.getByText('Max Length is 20 characters')).toBeInTheDocument();
  });
});
