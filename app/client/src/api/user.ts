import { axios } from '@utils'
import { loginResponse } from 'model/login'
export class User {
  static fetchLoginUser() {
    return axios.get<loginResponse>('/auth/login/success')
  }
}
