import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import {} from '../../store'

// create a new mutex
const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  { maxRetries: 0 },
)

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: _builder => ({}),
})
