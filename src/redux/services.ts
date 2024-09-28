import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseUrl} from '../config/apiUrl';

export const apiService = createApi({
  reducerPath: 'apiService',
  baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
  endpoints: builder => ({
    signUp: builder.mutation({
      query: body => ({
        url: `/auth/signup`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {useSignUpMutation} = apiService;
