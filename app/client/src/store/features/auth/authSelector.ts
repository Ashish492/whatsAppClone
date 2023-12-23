import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

export const authSelector = (state: RootState) => state.auth
export const authUserSelector = createSelector(authSelector, auth => auth.user)
export const isLoginSelector = createSelector(
  authSelector,
  auth => auth.isLogin,
)
