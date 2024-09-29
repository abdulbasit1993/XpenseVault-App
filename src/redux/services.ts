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
    signIn: builder.mutation({
      query: body => ({
        url: `/auth/signin`,
        method: 'POST',
        body: body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: body => ({
        url: `/auth/forgot-password`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {useSignUpMutation, useSignInMutation, useForgotPasswordMutation} =
  apiService;
