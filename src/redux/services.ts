import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseUrl} from '../config/apiUrl';
import {getData} from '../utils/storageService';

export const apiService = createApi({
  reducerPath: 'apiService',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: async (headers, {getState}) => {
      const token = await getData('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    },
  }),
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
    validateOTP: builder.mutation({
      query: body => ({
        url: `/auth/validate-otp`,
        method: 'POST',
        body: body,
      }),
    }),
    resetPassword: builder.mutation({
      query: body => ({
        url: `/auth/reset-password`,
        method: 'POST',
        body: body,
      }),
    }),
    getExpenseCategories: builder.query({
      query: () => ({
        url: '/expense-categories',
        method: 'GET',
      }),
    }),
    addExpense: builder.mutation({
      query: body => ({
        url: `/expenses/add`,
        method: 'POST',
        body: body,
      }),
    }),
    getExpensesOfUser: builder.query({
      query: () => ({
        url: `/expenses`,
        method: 'GET',
      }),
    }),
    getSingleExpense: builder.query({
      query: id => ({
        url: `/expenses/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useForgotPasswordMutation,
  useValidateOTPMutation,
  useResetPasswordMutation,
  useGetExpenseCategoriesQuery,
  useAddExpenseMutation,
  useGetExpensesOfUserQuery,
  useGetSingleExpenseQuery,
} = apiService;
