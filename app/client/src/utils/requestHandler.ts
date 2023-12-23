import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
type BaseRequest<T, V, D = unknown> = ({
  params,
  options,
}: {
  params?: T
  options?: AxiosRequestConfig<D>
}) => Promise<AxiosResponse<V>>
type SuccessResponse<V> = {
  code: 'success'
  data: V
}
type ErrorResponse<E = AxiosError> = {
  code: 'error'
  error: E
}
type BaseResponse<V, E> = Promise<SuccessResponse<V> | ErrorResponse<E>>
export const requestHandler =
  <V, P = unknown, D = unknown, E = AxiosError>(
    request: BaseRequest<P, V, D>,
  ) =>
  async ({
    params,
    options,
  }: {
    params?: P
    options?: AxiosRequestConfig<D>
  } = {}): BaseResponse<V, E> => {
    try {
      const response = await request({ params, options })
      return { code: 'success', data: response.data }
    } catch (e) {
      return { code: 'error', error: e as E }
    }
  }
