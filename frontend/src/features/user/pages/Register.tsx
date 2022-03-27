import React, { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../reduxSlice/authSlice';
import Spinner from '../../../components/Spinner';
import { registerGraphql } from '../api/register/registerGraphql';
import { registerRest } from '../api/register/registerRest';
import { useApolloClient } from '@apollo/client';
import { APOLLO_GRAPHQL } from '../../../utils/constants';
import { User } from '../interface/userInterfaces';
import Copyright from '../components/Copyright';

export default function Register() {
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const client = useApolloClient();
  const { user, isLoading, isSuccess, message, isError } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    //Redirect when logged in
    if (isSuccess || user) {
      navigate('/');
    }
    //dispatch(reset());
  }, [isError, isSuccess, user, navigate, dispatch, message]);

  //const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  console.log(e.target.id);

  //  setUserName(e.currentTarget.value);
  //};
  //const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setName(e.currentTarget.value);
  //};
  //const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setPassword(e.currentTarget.value);
  //};
  //const onChangePassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setPassword2(e.currentTarget.value);
  //};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'userName':
        setUserName(e.currentTarget.value);
        break;
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'password':
        setPassword(e.currentTarget.value);
        break;
      case 'password2':
        setPassword2(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: User = {
      name,
      userName,
      password,
    };

    dispatch(
      register({
        user: userData,
        registerRequest: APOLLO_GRAPHQL
          ? (user: User) => registerGraphql(client, user)
          : registerRest,
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  value={userName}
                  onChange={handleChange}
                  id="userName"
                  label="User Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={name}
                  onChange={handleChange}
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={password}
                  onChange={handleChange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={password2}
                  onChange={handleChange}
                  name="confirm password"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
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
