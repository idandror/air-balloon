import { useApolloClient } from '@apollo/client';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import BalloonsList from '../components/BalloonsList';
import MapResium from '../../../components/MapResium';
import balloonReducer from '../reduxSlice/balloonReducer';
import { getBalloons } from '../reduxSlice/balloonSlice';
import { getBalloonsGraphql } from '../api/getBalloons/getBalloonsGraphql';
import { APOLLO_GRAPHQL } from '../../../utils/constants';
import { getBalloonsRest } from '../api/getBalloons/getBalloonsRest';

const Home: React.FC = () => {
  const user  = useAppSelector((state) => state.auth.user);
  const isError = useAppSelector((state) => state.balloons.isError);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const client = useApolloClient();

  useEffect(() => {
    if (user) {
      dispatch(
        getBalloons({
          getBalloonsRequest: APOLLO_GRAPHQL
            ? () => getBalloonsGraphql(client)
            : getBalloonsRest,
        })
      );
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, user]);
  return (
    <>
      <section className="heading">
        <div className="leftside" style={{ width: '70%' }}>
          <MapResium />
        </div>
        <div className="rightside" style={{ width: '30%' }}>
          <BalloonsList />
        </div>
      </section>
    </>
  );
};

export default Home;
