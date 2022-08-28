import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllVehicles } from './getAllService'

const initialState = {
    vehicles: [],
    vehicle: null,
    isError: false,
    isSuccess: false,
    message: '',
  }

//! get all vehicles
export const getAllvehicles = createAsyncThunk(
    'vehicle/getAllVehicles',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        console.log('token',token)
        return await getAllVehicles(token)
      } catch (error) {
        const message = error.response.data.msg || error.message
        return thunkAPI.rejectWithValue(message)
      }
    }
  )
  export const getAllSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
      reset: (state) => {
        state.isSuccess = false
        state.isError = false
        state.message = ''
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllvehicles.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getAllvehicles.fulfilled, (state, action) => {
          state.isLoading = false
          state.vehicles = action.payload
          state.isError = false
        })
        .addCase(getAllvehicles.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.vehicles = null
        })
    },
  })
  
  export const { reset } = getAllSlice.actions
  export default getAllSlice.reducer