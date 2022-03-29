import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import GraphqlProvider from '../../../components/GraphqlProvider';
import { createStore } from '../../../app/store';
import PopupForm from '../components/PopupForm';

test('renders Popup form', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <GraphqlProvider useMocks>
        <Provider store={createStore()}>
          <PopupForm />
        </Provider>
      </GraphqlProvider>
    </MemoryRouter>
  );

  //expect(screen.getByText('Balloons')).toBeInTheDocument();
  expect(await screen.findByText(/Create/i)).toBeInTheDocument();
  screen!.debug();
});
