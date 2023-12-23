import { axios } from '@utils'
import { requestHandler } from '@utils/requestHandler'
import { RequestHandler } from 'decorators/requestHanlder'
import { LoginResponse } from 'model/login'
export class User {
  static fetchLoginUser = requestHandler<LoginResponse>(({ options }) =>
    axios.get('/auth/login/success', {
      ...(options ?? {}),
    }),
  )

  @RequestHandler<LoginResponse>()
  static async fetchUser({}) {
    return axios.get('/auth/login/success')
  }
}
