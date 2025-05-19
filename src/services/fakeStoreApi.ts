import { CartItem, Product } from '../types/interface';
// src/services/fakeStoreApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fakeStoreApi = createApi({
  reducerPath: 'fakeStoreApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
        query: () => 'products',
      }),
    getCategories: builder.query<string[], void>({
      query: () => 'products/categories',
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    getProductsByCategory: builder.query({
      query: (category) => `products/category/${category}`,
    }),
    addToCart: builder.mutation({
      query: (cartData) => ({
        url: 'carts',
        method: 'POST',
        body: cartData,
      }),
    }),
    getCarts: builder.query<CartItem[], void>({
      query: () => 'carts',
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useAddToCartMutation,
  useGetCartsQuery,
} = fakeStoreApi;