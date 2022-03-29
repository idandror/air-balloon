import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from '../../../app/store';
import Register from '../pages/Register';
import GraphqlProvider from '../../../components/GraphqlProvider';

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

  expect(screen.getByRole('button', { name: /SIGN UP/i })).toBeInTheDocument();
//  expect(screen.getByRole('h1', { name: /Sign up/i })).toBeInTheDocument();

  //  expect(await screen.findByLabelText(/Sign/i)).toBeInTheDocument();
  screen!.debug();
});
