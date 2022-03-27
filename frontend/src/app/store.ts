import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/user/reduxSlice/authSlice';
import balloonReducer from '../features/balloon/reduxSlice/balloonSlice';

//export const store = configureStore({
//  reducer: {
//    auth: authReducer,
//    balloons: balloonReducer,
//  },
//});
export const createStore = () =>
  configureStore({
    reducer: { auth: authReducer, balloons: balloonReducer },
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
