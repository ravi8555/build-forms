// hooks/api/billing/index.ts

import { trpc } from "~/trpc/client";

export const useSubscription = (enabled = true) => {
  const query = trpc.billing.getSubscription.useQuery(undefined, {
    retry: false,
    enabled,
  });

  return {
    subscription: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isFetched: query.isFetched,
    error: query.error,
    refetch: query.refetch,
    status: query.status,
  };
};

export const useStartProSubscription = () => {
  const utils = trpc.useUtils();

  const mutation = trpc.billing.startSubscription.useMutation({
    onSuccess: async () => {
      await utils.billing.getSubscription.invalidate();
    },
  });

  return {
    startProSubscriptionAsync: mutation.mutateAsync,
    startProSubscription: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

export const useCancelSubscription = () => {
  const utils = trpc.useUtils();

  const mutation = trpc.billing.cancelSubscription.useMutation({
    onSuccess: async () => {
      await utils.billing.getSubscription.invalidate();
    },
  });

  return {
    cancelSubscriptionAsync: mutation.mutateAsync,
    cancelSubscription: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
