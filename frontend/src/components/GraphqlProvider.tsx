import { ApolloProvider } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { loginQueryMock } from '../features/user/api/login/loginMock';
import React from 'react';
import { getBalloonsQueryMock } from '../features/balloon/api/getBalloons/getBalloonsMock';
import { createBalloonQueryMock } from '../features/balloon/api/addEditBalloon/createBalloonMock';
import { editBalloonQueryMock } from '../features/balloon/mock/editBalloonMock';
import { apolloClient } from '../app/apollo';

interface GraphqlProviderProps {
  useMocks?: boolean;
}

const GraphqlProvider: React.FC<GraphqlProviderProps> = ({
  useMocks,
  children,
}) => {
  if (useMocks)
    return (
      <MockedProvider
        mocks={[
          ...loginQueryMock,
          ...getBalloonsQueryMock,
          ...createBalloonQueryMock,
		  ...editBalloonQueryMock
        ]}
      >
        <>{children}</>
      </MockedProvider>
    );
  return (
    <ApolloProvider client={apolloClient}>
      <>{children}</>
    </ApolloProvider>
  );
};

export default GraphqlProvider;
