import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import GraphqlProvider from '../../../components/GraphqlProvider';
import BalloonsList from '../components/BalloonsList';
import { createStore } from '../../../app/store';

jest.mock('../../../utils/constants.ts', () => ({
  __esModule: true,
  APOLLO_GRAPHQL: true,
  isMock: false,
}));

describe('Balloons List component test', () => {
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

    expect(screen.getByText(/Balloons Form/i)).toBeInTheDocument();
    expect(screen.getByText(/Create New Balloon/i)).toBeInTheDocument();
    //screen!.debug();
  });

  test('renders Balloons List component and get mocked value', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <GraphqlProvider useMocks={true}>
          <Provider store={createStore()}>
            <BalloonsList />
          </Provider>
        </GraphqlProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Balloons Form/i)).toBeInTheDocument();
    expect(screen.getByText(/Create New Balloon/i)).toBeInTheDocument();
    //screen!.debug();
  });
});
