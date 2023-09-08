import { useQuery, UseQueryOptions } from 'react-query';

// {
//   /**
//    * Set this to `false` to disable automatic refetching when the query mounts or changes query keys.
//    * To refetch the query, use the `refetch` method returned from the `useQuery` instance.
//    * Defaults to `true`.
//    */
//   enabled?: boolean;
//   /**
//    * The time in milliseconds after data is considered stale.
//    * If set to `Infinity`, the data will never be considered stale.
//    */
//   staleTime?: number;
//   /**
//    * If set to a number, the query will continuously refetch at this frequency in milliseconds.
//    * If set to a function, the function will be executed with the latest data and query to compute a frequency
//    * Defaults to `false`.
//    */
//   refetchInterval?: number | false | ((data: TData | undefined, query: Query<TQueryFnData, TError, TQueryData, TQueryKey>) => number | false);
//   /**
//    * If set to `true`, the query will continue to refetch while their tab/window is in the background.
//    * Defaults to `false`.
//    */
//   refetchIntervalInBackground?: boolean;
//   /**
//    * If set to `true`, the query will refetch on window focus if the data is stale.
//    * If set to `false`, the query will not refetch on window focus.
//    * If set to `'always'`, the query will always refetch on window focus.
//    * If set to a function, the function will be executed with the latest data and query to compute the value.
//    * Defaults to `true`.
//    */
//   refetchOnWindowFocus?: boolean | 'always' | ((query: Query<TQueryFnData, TError, TQueryData, TQueryKey>) => boolean | 'always');
//   /**
//    * If set to `true`, the query will refetch on reconnect if the data is stale.
//    * If set to `false`, the query will not refetch on reconnect.
//    * If set to `'always'`, the query will always refetch on reconnect.
//    * If set to a function, the function will be executed with the latest data and query to compute the value.
//    * Defaults to `true`.
//    */
//   refetchOnReconnect?: boolean | 'always' | ((query: Query<TQueryFnData, TError, TQueryData, TQueryKey>) => boolean | 'always');
//   /**
//    * If set to `true`, the query will refetch on mount if the data is stale.
//    * If set to `false`, will disable additional instances of a query to trigger background refetches.
//    * If set to `'always'`, the query will always refetch on mount.
//    * If set to a function, the function will be executed with the latest data and query to compute the value
//    * Defaults to `true`.
//    */
//   refetchOnMount?: boolean | 'always' | ((query: Query<TQueryFnData, TError, TQueryData, TQueryKey>) => boolean | 'always');
//   /**
//    * If set to `false`, the query will not be retried on mount if it contains an error.
//    * Defaults to `true`.
//    */
//   retryOnMount?: boolean;
//   /**
//    * If set, the component will only re-render if any of the listed properties change.
//    * When set to `['data', 'error']`, the component will only re-render when the `data` or `error` properties change.
//    * When set to `tracked`, access to properties will be tracked, and the component will only re-render when one of the tracked properties change.
//    */
//   notifyOnChangeProps?: Array<keyof InfiniteQueryObserverResult> | 'tracked';
//   /**
//    * If set, the component will not re-render if any of the listed properties change.
//    */
//   notifyOnChangePropsExclusions?: Array<keyof InfiniteQueryObserverResult>;
//   /**
//    * This callback will fire any time the query successfully fetches new data or the cache is updated via `setQueryData`.
//    */
//   onSuccess?: (data: TData) => void;
//   /**
//    * This callback will fire if the query encounters an error and will be passed the error.
//    */
//   onError?: (err: TError) => void;
//   /**
//    * This callback will fire any time the query is either successfully fetched or errors and be passed either the data or error.
//    */
//   onSettled?: (data: TData | undefined, error: TError | null) => void;
//   /**
//    * Whether errors should be thrown instead of setting the `error` property.
//    * If set to `true` or `suspense` is `true`, all errors will be thrown to the error boundary.
//    * If set to `false` and `suspense` is `false`, errors are returned as state.
//    * If set to a function, it will be passed the error and the query, and it should return a boolean indicating whether to show the error in an error boundary (`true`) or return the error as state (`false`).
//    * Defaults to `false`.
//    */
//   useErrorBoundary?: boolean | ((error: TError, query: Query<TQueryFnData, TError, TQueryData, TQueryKey>) => boolean);
//   /**
//    * This option can be used to transform or select a part of the data returned by the query function.
//    */
//   select?: (data: TQueryData) => TData;
//   /**
//    * If set to `true`, the query will suspend when `status === 'loading'`
//    * and throw errors when `status === 'error'`.
//    * Defaults to `false`.
//    */
//   suspense?: boolean;
//   /**
//    * Set this to `true` to keep the previous `data` when fetching based on a new query key.
//    * Defaults to `false`.
//    */
//   keepPreviousData?: boolean;
//   /**
//    * If set, this value will be used as the placeholder data for this particular query observer while the query is still in the `loading` data and no initialData has been provided.
//    */
//   placeholderData?: TQueryData | PlaceholderDataFunction<TQueryData>;
//   /**
//    * If set, the observer will optimistically set the result in fetching state before the query has actually started fetching.
//    * This is to make sure the results are not lagging behind.
//    * Defaults to `true`.
//    */
//   optimisticResults?: boolean;
// }

/**
 * @description Hook to fetch get requests data using RQ
 * @param {*} apiPromise Axios Promise to be passed on to RQ
 * @param {*} apiPromiseArgs Args to pass to the request like params or query params
 * @param {*} key  React query key for data @mandatory
 * @param {*} queryOptions Query Options to configure RQ
 * @return Object with data containing response and rq_data containing rq data format with all the request and response configurationns and several other parameters
 * @note Pass signal as second arg to api promise and use useQueryClient hook to cancel previous requests if required
 * @note Please refer the options and descriptions below for configuring RQ
 */
export const useFetch = (
  apiPromise: (arg0: any, arg1: AbortSignal | undefined) => any,
  apiPromiseArgs: any,
  key: any,
  queryOptions:
    | Omit<UseQueryOptions<any, unknown, any, any[]>, 'queryKey' | 'queryFn'>
    | undefined
) => {
  const result = useQuery(
    [key, apiPromiseArgs],
    ({ signal }) => apiPromise(apiPromiseArgs, signal),
    {
      keepPreviousData: true,
      staleTime: 10000,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      retry: 3,
      retryDelay: 2000,
      ...queryOptions,
    }
  );
  const data = result?.data?.data?.data;
  const rq_data = result?.data;
  delete result?.data;
  //@ts-ignore

  return { data, rq_data, ...result };
};
