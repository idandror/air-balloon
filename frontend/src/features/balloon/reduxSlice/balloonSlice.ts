import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { authState } from '../../user/interface/userInterfaces';
import {
  Balloon,
  balloonState,
  error,
  Position,
} from '../interface/balloonInterfaces';

const initialState: balloonState = {
  balloons: [],
  balloon: undefined,
  activePos: undefined,
  isError: undefined,
  isSuccess: false,
  isLoading: false,
};

export const API_URL = 'http://localhost:5000/api/balloons';
//Create new balloon
export const createEditBalloon = createAsyncThunk<
  Balloon,
  {
    balloon: Balloon;
    createEditBalloonGraphql: (
      balloon: Balloon,
      token: string
    ) => Promise<Balloon>;
  },
  { rejectValue: error }
>(
  'balloon/create',
  async (
    { balloon, createEditBalloonGraphql },
    { getState, rejectWithValue }
  ) => {
    try {
      const { auth } = getState() as { auth: authState };
      return await createEditBalloonGraphql(balloon, auth.user?.token!);
    } catch (err) {
      const error = err as Error;
      if (axios.isAxiosError(error))
        return rejectWithValue(error.response?.data);
      return rejectWithValue({
        statusCode: 500,
        message: 'failed to create a new balloon',
      });
    }
  }
);

//Edit existing balloon
export const editBalloon = createAsyncThunk<
  Balloon,
  {
    balloon: Balloon;
    editBalloonRequest: (balloon: Balloon, token: string) => Promise<Balloon>;
  },
  { rejectValue: error }
>(
  'balloon/edit',
  async ({ balloon, editBalloonRequest }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: authState };
      return await editBalloonRequest(balloon, auth.user?.token!);
    } catch (err) {
      const error = err as Error;
      if (axios.isAxiosError(error))
        return rejectWithValue({
          statusCode: error.response!.status,
          message: error.response?.data,
        });
      return rejectWithValue({
        statusCode: 500,
        message: 'failed to edit balloon',
      });
    }
  }
);

//Get all balloons
export const getBalloons = createAsyncThunk<
  Balloon[],
  { getBalloonsRequest: (token: string) => Promise<Balloon[]> },
  { rejectValue: error }
>(
  'balloon/getAll',
  async ({ getBalloonsRequest }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: authState };
      return await getBalloonsRequest(auth.user?.token!);
    } catch (err) {
      const error = err as Error;
      if (axios.isAxiosError(error))
        return rejectWithValue({
          statusCode: error.response!.status,
          message: error.response?.data,
        });
      return rejectWithValue({
        statusCode: 500,
        message: 'failed to get all balloons',
      });
    }
  }
);

//Get all balloons
export const getBalloon = createAsyncThunk<
  Balloon,
  {
    id: string;
    getBalloonRequest: (id: string, token: string) => Promise<Balloon>;
  },
  { rejectValue: error }
>(
  'balloon/get/:id',
  async ({ id, getBalloonRequest }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: authState };
      const data = await getBalloonRequest(id, auth.user?.token!);
      return data;
    } catch (err) {
      const error = err as Error;

      if (axios.isAxiosError(error))
        return rejectWithValue(error.response?.data);
      return rejectWithValue({
        statusCode: 500,
        message: 'failed to get all balloons',
      });
    }
  }
);

export const balloonSlice = createSlice({
  name: 'balloons',
  initialState,
  reducers: {
    reset: (state) => (state = initialState),
    setBalloon(state, action: PayloadAction<Balloon>) {
      state.balloon = action.payload;
    },
    resetBalloon(state) {
      state.balloon = undefined;
      state.activePos = undefined;
    },
    resetError(state) {
      state.isError = undefined;
    },
    GetBalloonsApollo(state, action: PayloadAction<Balloon[]>) {
      state.balloons = action.payload;
    },
    updateActiveBalloonPos(state, action: PayloadAction<Position>) {
      state.activePos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEditBalloon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEditBalloon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = undefined;
        state.isSuccess = true;
        state.balloon = action.payload;
        //state.balloons?.push(action.payload);
      })
      .addCase(createEditBalloon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = {
          statusCode: action.payload!.statusCode,
          message: action.payload!.message,
        };
        state.isSuccess = false;
        state.balloon = undefined;
      })
      //.addCase(editBalloon.pending, (state) => {
      //  state.isLoading = true;
      //  state.isSuccess = false;
      //})
      //.addCase(editBalloon.fulfilled, (state, action) => {
      //  state.isLoading = false;
      //  state.isError = undefined;
      //  state.isSuccess = true;
      //  state.balloon = action.payload;
      //})
      //.addCase(editBalloon.rejected, (state, action) => {
      //  state.isLoading = false;
      //  state.isError = {
      //    statusCode: action.payload!.statusCode,
      //    message: action.payload!.message,
      //  };
      //  state.isSuccess = false;
      //})
      .addCase(getBalloons.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getBalloons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = undefined;
        state.balloons = action.payload;
      })
      .addCase(getBalloons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.isSuccess = false;
        state.balloons = [];
      })
      .addCase(getBalloon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalloon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = undefined;
        state.balloon = action.payload;
      })
      .addCase(getBalloon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.isSuccess = false;
        state.balloon = undefined;
      });
  },
});
export const {
  reset,
  resetError,
  setBalloon,
  GetBalloonsApollo,
  resetBalloon,
  updateActiveBalloonPos,
} = balloonSlice.actions;

export default balloonSlice.reducer;
