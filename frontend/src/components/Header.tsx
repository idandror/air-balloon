import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/user/reduxSlice/authSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Login, Logout, Person } from '@mui/icons-material';
import { resetError } from '../features/balloon/reduxSlice/balloonSlice';

const logo = require('../utils/Devalore-Ltd.jpg');

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const onLogout = async () => {
    dispatch(reset());
    dispatch(resetError());
    await dispatch(logout());
    navigate('/login');
  };
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img
            src={logo}
            alt="Devalore logo"
            style={{ height: '70px', width: '100px' }}
          ></img>
        </Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>{user.userName}</li>
            <li>
              <button className="btn" onClick={onLogout}>
                <Logout />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <Login /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <Person /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
