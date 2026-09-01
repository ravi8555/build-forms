// hooks/api/gdpr/index.ts

import { trpc } from "~/trpc/client";

export const useExportMyData = () => {
  const mutation = trpc.auth.exportMyData.useMutation();

  return {
    exportMyDataAsync: mutation.mutateAsync,
    exportMyData: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};

export const useDeleteMyAccount = () => {
  const utils = trpc.useUtils();

  const mutation = trpc.auth.deleteMyAccount.useMutation({
    onSuccess: async () => {
      await utils.invalidate();
    },
  });

  return {
    deleteMyAccountAsync: mutation.mutateAsync,
    deleteMyAccount: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
};
