import { axios } from '@utils'
import { requestHandler } from '@utils/requestHandler'
import {} from 'decorators/requestHandler'
import { LoginResponse } from 'model/login'
export default class UserService {
  static fetchLoginUser = requestHandler<LoginResponse>(({ options }) =>
    axios.get('/auth/login/success', {
      ...(options ?? {}),
    }),
  )
}
