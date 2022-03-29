import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import GraphqlProvider from '../../../components/GraphqlProvider';
import { createStore } from '../../../app/store';
import PopupForm from '../components/PopupForm';
import userEvent from '@testing-library/user-event';

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

  expect(await screen.findByText(/Create New Balloon/i)).toBeInTheDocument();
//  screen!.debug();
});

test('renders Popup form, press on create new balloon and the form pops correctly', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <GraphqlProvider useMocks>
        <Provider store={createStore()}>
          <PopupForm />
        </Provider>
      </GraphqlProvider>
    </MemoryRouter>
  );

  expect(await screen.findByText(/Create/i)).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /Create New Balloon/i })
  ).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: /Create New Balloon/i }));
  expect(screen.getByRole('button', { name: /SUBMIT/i })).toBeInTheDocument();
//  screen!.debug();
});
