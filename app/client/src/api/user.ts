import { axios } from '@utils'
import { LoginResponse } from 'model/login'
export class User {
  static fetchLoginUser() {
    return axios.get<LoginResponse>('/auth/login/success')
  }
}
