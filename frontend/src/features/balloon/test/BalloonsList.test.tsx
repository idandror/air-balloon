import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import GraphqlProvider from '../../../components/GraphqlProvider';
import BalloonsList from '../components/BalloonsList';
import { createStore } from '../../../app/store';

test('renders Balloons List component', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <GraphqlProvider useMocks>
        <Provider store={createStore()}>
          <BalloonsList />
        </Provider>
      </GraphqlProvider>
    </MemoryRouter>
  );

  //expect(screen.getByText('Balloons')).toBeInTheDocument();
  expect(await screen.findByText(/Balloons Form/i)).toBeInTheDocument();
  expect(await screen.findByText(/Create New Balloon/i)).toBeInTheDocument();
  screen!.debug();
});
