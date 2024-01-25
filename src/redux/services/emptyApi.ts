import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store';
import baseQuery from './baseQuery';

export const emptySplitApi  = createApi({
  baseQuery,
  endpoints: () => ({}),
})