import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
type BaseRequest<V, P, D = unknown> = ({
  params,
  options,
}: {
  params?: P
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
export function RequestHandler<V, P = unknown, D = unknown, E = AxiosError>() {
  return (
    target: BaseRequest<V, P, D>,
    _context: ClassMethodDecoratorContext<unknown, BaseRequest<V, P, D>>,
  ) =>
    async function (
      this: unknown,
      params: {
        params?: P
        options?: AxiosRequestConfig<D>
      } = {},
    ): BaseResponse<V, E> {
      try {
        const result = await target.call(this, params)
        return { code: 'success', data: result.data as V }
      } catch (error) {
        return { code: 'error', error: error as E }
      }
    }
}
