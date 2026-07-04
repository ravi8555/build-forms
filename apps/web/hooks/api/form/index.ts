import { trpc } from "~/trpc/client";
// const utils = trpc.useUtils();

export const useCreateForm = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: createFormAsync,
    mutate: createForm,
    error,
    isError,
    failureCount,
    isIdle,
    isSuccess,
    status,
    
  } = trpc.form.createForm.useMutation({
    onSuccess: async () => {
      // Invalidate cached user forms or profile info if needed
      await utils.form.invalidate(); 
      // or await utils.form.getForms.invalidate(); if you have a getForms query
    },
  });

  return {
    createFormAsync,
    createForm,
    error,
    isError,
    failureCount,
    isIdle,
    isSuccess,
    status,
    };
}

export const useListForms = () => {
  const {
    data: forms,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    status,
    refetch,
  } = trpc.form.listForms.useQuery();  
  // } = trpc.form.listForms.useQuery(undefined, {
  //   // Optional: you can configure staleTime, cacheTime, etc.
  //   staleTime: 1000 * 60, // 1 minute
  // });

  return {
    forms,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    status,
    refetch,
  };
};

export const useCreateField = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: createFieldAsync,
    mutate: createField,
    error,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.createField.useMutation({
    onSuccess: async () => {
      // Invalidate cached fields for the form
      await utils.form.invalidate();
    },
  });

  return {
    createFieldAsync,
    createField,
    error,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

// ✅ Update Field Hook
export const useUpdateField = () => {
  const utils = trpc.useUtils();
  const {
    mutateAsync: updateFieldAsync,
    mutate: updateField,
    error,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.updateField.useMutation({
     onSuccess: async () => {
      // await utils.form.listFields.invalidate()
      await utils.form.listFields.invalidate()
    },
  });

  return {
    updateFieldAsync,
    updateField,
    error,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

// ✅ Delete Field Hook
export const useDeleteField = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: deleteFieldAsync,
    mutate: deleteField,
    error,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.deleteField.useMutation({
    onSuccess: async () => {
      // Invalidate cached fields after deletion
      await utils.form.invalidate();
    },
  });

  return {
    deleteFieldAsync,
    deleteField,
    error,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

// ✅ Get Field Hook
export const useGetField = (fieldId: string) => {
  const {
    data: field,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    status,
    refetch,
  } = trpc.form.getField.useQuery({ fieldId });

  return {
    field,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    status,
    refetch,
  };
};

export const useListFields = (formId: string) => {
  const {
    data: fields,
    error,
    isError,
    isFetched,    
    isFetching,
    isLoading,
    status,
    refetch,
  } = trpc.form.listFields.useQuery({ formId });

  return {
    fields,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    status,
    refetch,
  };
};

export const useGetForm = (formId: string) => {
  const { data: form, error, isFetched, isFetching, isLoading, status } =
    trpc.form.getForm.useQuery({ formId });

  return {
    form,
    error,
    isFetched,
    isFetching,
    isLoading,
    status,
  };
};
export const useSubmitForm = () => {
  const {
   mutateAsync: submitFormAsync,
    mutate: submitForm,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.submitForm.useMutation();

  return {
    submitFormAsync,
    submitForm,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

export const useGetFormSubmissions = (formId: string) => {
  const {
    data: submissions,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = trpc.form.getFormSubmissions.useQuery({ formId });

  return {
    submissions,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};

export const useDeleteForm = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: deleteFormAsync,
    mutate: deleteForm,
    error,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.deleteForm.useMutation({
    onSuccess: async () => {
      await utils.form.listForms.invalidate();
    },
  });

  return {
    deleteFormAsync,
    deleteForm,
    error,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

// export const useDashboardAnalytics = () => {
//   const {
//     data,
//     error,
//     isLoading,
//     isError,
//     isSuccess,
//   } = trpc.form.getDashboardAnalytics.useQuery();

//   return {
//     analytics: data,
//     error,
//     isLoading,
//     isError,
//     isSuccess,
//   };
// };

export const useDashboardAnalytics = (
  enabled = true
) => {
  const query =
    trpc.form.getDashboardAnalytics.useQuery(
      undefined,
      {
        enabled,
        retry: false,
      }
    );

  return {
    analytics: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
};
export const useUpdateFormVisibility = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: updateVisibilityAsync,
    mutate: updateVisibility,
    error,
    isError,
    isIdle,
    isSuccess,
    status,
  } = trpc.form.updateVisibility.useMutation({
    onSuccess: async () => {
      await utils.form.listForms.invalidate();
    },
  });

  return {
    updateVisibilityAsync,
    updateVisibility,
    error,
    isError,
    isIdle,
    isSuccess,
    status,
  };
};

export const useListPublicForms = () => {
  const {
    data: forms,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = trpc.form.listPublicForms.useQuery()

  return {
    forms,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch,
  }
}

// export function useCreateReport() {
//   const utils = trpc.useUtils();

//   const mutation =
//     trpc.form.createReport.useMutation({
//       onSuccess() {
//         utils.form.invalidate();
//       },
//     });

//   return {
//     createReportAsync: mutation.mutateAsync,
//     isLoading: mutation.isPending,
//   };
// }

export function useListReports() {
  const query =
    trpc.form.listReports.useQuery();

  return {
    reports: query.data,
    isLoading: query.isLoading,
  };
}


export const useCreateReport = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: createReportAsync,
    mutate: createReport,
    isPending,
    isSuccess,
    error,
  } = trpc.form.createReport.useMutation({
    onSuccess: async () => {
      await utils.form.listReports.invalidate();
    },
  });

  return {
    createReport,
    createReportAsync,
    isPending,
    isSuccess,
    error,
  };
};

export const useHasReported = (
  formId: string
) => {

  const query =
    trpc.form.hasReported.useQuery(
      { formId },
      {
        enabled: !!formId,
      }
    );

  return {
    hasReported:
      query.data?.reported ?? false,

    ...query,
  };
};


export const useUpdateReportStatus = () => {
  const utils = trpc.useUtils();

  const mutation =
    trpc.form.updateReportStatus.useMutation({
      onSuccess: async () => {
        await utils.form.listReports.invalidate();
      },
    });

  return {
    updateStatusAsync: mutation.mutateAsync,
    updateStatus: mutation.mutate,
    isPending: mutation.isPending,
    status: mutation.status,
    error: mutation.error,
  };
};

export const useHideReportedForm = () => {

  const utils = trpc.useUtils();

  const mutation =
    trpc.form.hideReportedForm.useMutation({

      onSuccess: async () => {

        await utils.form.listReports.invalidate();

        await utils.form.listPublicForms.invalidate();

      },

    });

  return {

    hideReportedFormAsync:
      mutation.mutateAsync,

    ...mutation,

  };

};