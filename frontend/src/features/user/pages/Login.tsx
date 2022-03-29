import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Link,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  Alert,
} from '@mui/material';
import LockOutlined from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, logout, reset } from '../reduxSlice/authSlice';
import Spinner from '../../../components/Spinner';
import { useApolloClient } from '@apollo/client';
import { resetError } from '../../balloon/reduxSlice/balloonSlice';
import { APOLLO_GRAPHQL } from '../../../utils/constants';
import Copyright from '../components/Copyright';
import { loginGraphql } from '../api/login/loginGraphql';
import { loginRest } from '../api/login/loginRest';
import { User } from '../interface/userInterfaces';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const client = useApolloClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, message, isError } = useAppSelector(
    (state) => state.auth
  );
  const { isError: balloonsError } = useAppSelector((state) => state.balloons);

  const regexNumbers = new RegExp('(?=[0-9])');
  const regexSpecial = new RegExp('(?=[!@#$%^&*])');

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(resetError());
    } else if (balloonsError) {
      //Error 401 sent from the backend while creating balloon in BalloonsList component
      dispatch(logout());
      dispatch(reset());
      dispatch(resetError());
    }
    //Redirect when logged in
    else if (isSuccess || user) {
      navigate('/');
    }

    //dispatch(reset());
  }, [isError, isSuccess, user, navigate, dispatch, message, balloonsError]);

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const checkPassword = () => {
    const number = regexNumbers.test(password);
    const special = regexSpecial.test(password);
    if (number && special) {
      if (password.length > 7 && password.length < 13) {
        //if everything is ok
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const onChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  const checkUserName = () => {
    if (userName && userName.length < 20) {
      return true;
    } else {
      return false;
    }
  };

  const validate = () => {
    const checkUser = checkUserName();
    const checkPass = checkPassword();

    if (checkUser && checkPass) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: User = {
      userName,
      password,
    };

    dispatch(
      login({
        user: userData,
        loginRequest: APOLLO_GRAPHQL
          ? (user: User) => loginGraphql(client, user)
          : loginRest,
      })
    );
  };

  return (
    <>
      {isLoading && <Spinner />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              error={!checkUserName()}
              value={userName}
              onChange={onChangeUser}
              onBlur={validate}
              label="User Name"
              name="userName"
              helperText={
                !checkUserName()
                  ? 'Max Length is 20 characters'
                  : 'Please enter your User Name'
              }
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              helperText={
                !checkPassword()
                  ? 'Password must have a number and one special letter, between 8-12 characters'
                  : 'Please enter your Password'
              }
              error={!checkPassword()}
              value={password}
              onChange={onChangePassword}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              disabled={!validate()}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {isError && (
              <Alert severity="error">
                {message}
              </Alert>
            )}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </>
  );
}
