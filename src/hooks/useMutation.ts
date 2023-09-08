import {
  InvalidateQueryFilters,
  MutationFunction,
  useMutation,
  useQueryClient,
} from 'react-query';

export default function useConfigurableMutation(
  mutationFunction: MutationFunction<unknown, void>,
  queryKey: InvalidateQueryFilters<unknown> | undefined,
  config: any = {}
) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, onSettled, ...rest } = config;

  return useMutation(mutationFunction, {
    ...rest,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries(queryKey);
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (onError) {
        onError(error, variables, context);
      }
    },
    onSettled: (data, error, variables, context) => {
      if (onSettled) {
        onSettled(data, error, variables, context);
      }
    },
    onMutate: async (variables) => {
      const controller = new AbortController();
      const signal = controller.signal;

      // Add the abort signal to the mutation context
      return { variables, context: { signal } };
    },
  });
}

// const mutation = useConfigurableMutation(
//     async (data) => {
//       // Simulate a long-running API request
//       await new Promise((resolve) => setTimeout(resolve, 5000));
//       return { message: "Request completed successfully" };
//     },
//     "my-query-key",
//     {
//       // Your configuration options here
//     }
//   );

//   const handleClick = () => {
//     mutation.mutate(data, {
//       signal: mutation.context.signal,
//     });
//   };

//   const handleCancel = () => {
//     // Cancel the mutation request
//     mutation.context.signal.abort();
//   };
