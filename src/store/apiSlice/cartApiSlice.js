
import { apiSlice } from "../api";

const base = "orders"


export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addToCart: builder.mutation({
            query: (data) => ({
                url: base + '/cart/',
                method: 'POST',
                body: data,
            })
        }),
        getAllCartItems: builder.query({
            query: () => ({
                url: base + '/cart/',
                method: 'GET',
            })
        }),
        deleteFromCart: builder.mutation({
            query: (id) => ({
                url: base + '/cart/' + id + '/',
                method: 'DELETE',
            })
        }),
        decreaseQuantity: builder.mutation({
            query: (id) => ({
                url: base + '/cart/' + id + '/decrease_quantity/',
                method: 'PUT',
            })
        }),
        deleteAllFromCart: builder.mutation({
            query: () => ({
                url: base + `/cart/delete_all/`,
                method: 'DELETE',
            })
        }),
        getUserOrders: builder.query({
            query: () => ({
                url: base + `/`,
                method: 'GET'
            })
        }),
        startCreateOrder: builder.mutation({
            query: (data) => ({
                url: base + `/`,
                method: 'POST',
                body: { items: data },
            })
        }),
        startCreateMultipleCart: builder.mutation({
            query: (data) => ({
                url: base + `/create_multiple/`,
                method: 'PUT',
                body: { items: data.data },
                headers: {
                    Authorization: `JWT ${data.token}`
                }
            })
        }),
        createOrder: builder.mutation({
            query: (data) => ({
                url: base + `/cart/create_checkout_session/`,
                method: 'POST',
                body: { ...data },
            })
        }),
        confirmOrder: builder.mutation({
            query: (data) => ({
                url: base + `/update_order/`,
                method: 'PUT',
                body: data,
            })
        })
    })
})

export const {
    useAddToCartMutation, useGetAllCartItemsQuery, useDeleteFromCartMutation, useDecreaseQuantityMutation, useCreateOrderMutation, useStartCreateOrderMutation, useConfirmOrderMutation, useGetUserOrdersQuery, useDeleteAllFromCartMutation, useStartCreateMultipleCartMutation
} = cartApiSlice;
