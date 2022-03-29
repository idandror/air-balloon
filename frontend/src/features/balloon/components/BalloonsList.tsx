import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  resetBalloon,
  setBalloon,
} from '../reduxSlice/balloonSlice';
import BalloonListItem from './BalloonListItem';
import { GoBackButton } from '../../../components/GoBackButton';
import PopupForm from './PopupForm';
import Spinner from '../../../components/Spinner';

const BalloonsList: React.FC = () => {
  const { balloons, isError, isSuccess, isLoading } = useAppSelector(
    (state) => state.balloons
  );
  const balloon = useAppSelector((state) => state.balloons.balloon);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      if (isError.statusCode === 401) {
        navigate('/login');
      } else if (isError.statusCode % 100 === 0) {
        toast.error(isError.message);
      }
    }
  }, [isError]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const balloon = balloons?.find(
      (balloon) => balloon.id === e.currentTarget.accessKey
    );
    if (balloon) {
      dispatch(setBalloon(balloon));
    }
  };

  const goBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {

    dispatch(resetBalloon());
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className="ballonsform">
        <h1>Balloons Form</h1>
        <PopupForm balloon={balloon} />
      </div>
      <List
        sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Balloons List
          </ListSubheader>
        }
      >
        {!balloon ? (
          balloons?.map((balloon) => (
            <div key={balloon.id}>
              <ListItemButton onClick={handleClick} accessKey={`${balloon.id}`}>
                <ListItemText primary={balloon.name} />
                {balloon ? <ExpandMore /> : <ExpandLess />}
              </ListItemButton>
            </div>
          ))
        ) : (
          <Collapse in={true} timeout="auto" unmountOnExit>
            <div>
              <Button onClick={goBackClick}>
                <GoBackButton />
              </Button>
            </div>
            <BalloonListItem balloon={balloon} />
          </Collapse>
        )}
      </List>
    </>
  );
};

export default BalloonsList;
