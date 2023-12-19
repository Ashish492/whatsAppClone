import { loginResponse } from 'model/login'
import { axios } from 'utils'
export const loginWithGoogle = () =>
  axios.get<loginResponse>('/auth/login/google')
