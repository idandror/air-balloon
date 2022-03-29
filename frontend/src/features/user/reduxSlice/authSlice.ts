import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authState, User } from '../interface/userInterfaces';
import authReducers from './authReducers';

//Get user from localstorage

let user = null;
if (localStorage.getItem('user')) {
  user = JSON.parse(localStorage.getItem('user') || '');
}

const initialState: authState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//Register new user
export const register = createAsyncThunk<
  User,
  { user: User; registerRequest: (user: User) => Promise<User> },
  { rejectValue: string }
>('auth/register', async ({ user, registerRequest }, thunkAPI) => {
  try {
    const response = await registerRequest(user);
    if (response) {
      localStorage.setItem('user', JSON.stringify(response));
    }
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to register');
  }
});

//Login user
export const login = createAsyncThunk<
  User,
  { user: User; loginRequest: (user: User) => Promise<User> },
  { rejectValue: string }
>('auth/login', async ({ user, loginRequest }, thunkAPI) => {
  try {
    const response = await loginRequest(user);
    if (response) {
      localStorage.setItem('user', JSON.stringify(response));
    }
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue('Wrong Username or Password');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authReducers.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => (state = initialState),
    resetError(state) {
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload!;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload!;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset, resetError } = authSlice.actions;

export default authSlice.reducer;
