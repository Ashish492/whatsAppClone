import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserService } from '@services'
import { User } from 'shared'

export type Auth = {
  isLogin: boolean
  user?: User
}
const initialState: Auth = {
  isLogin: false,
}
export const checkLogin = createAsyncThunk<User, void>(
  'auth/checkLogin',
  async () => {
    const response = await UserService.fetchLoginUser({})
    if (response.code === 'error') {
      throw response.error
    } else {
      return response.data.user
    }
  },
)
export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setAuth: (_state, action: PayloadAction<Auth>) => {
      return action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.isLogin = true
        state.user = action.payload
      })
      .addCase(checkLogin.rejected, state => {
        state.isLogin = false
        state.user = undefined
      })
  },
})
export const { setAuth } = authSlice.actions
export const authReducer = authSlice.reducer
