import { LoginResponse } from 'model/login'
import { axios } from 'utils'
export const loginWithGoogle = () =>
  axios.get<LoginResponse>('/auth/login/google')
